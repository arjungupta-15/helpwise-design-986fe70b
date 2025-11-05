const { connectors, sourceSummary, syncLogs, alerts, resyncSource } = require('../models/data');
const { glpiGetCounts, solmanGetCounts, emailGetCounts } = require('../services/connectors');

async function getConnectors(req, res) {
  const glpi = await glpiGetCounts();
  const sol = await solmanGetCounts();
  const mail = await emailGetCounts();
  let updated = [...connectors];
  const patch = (name, data) => {
    if (!data) return;
    const idx = updated.findIndex(c => c.name === name || c.name.includes(name));
    if (idx >= 0) {
      updated[idx] = {
        ...updated[idx],
        status: data.status || updated[idx].status,
        lastSync: data.lastSync || updated[idx].lastSync,
        successes: data.successes ?? updated[idx].successes,
        failures: data.failures ?? updated[idx].failures,
      };
    }
  };
  patch('GLPI', glpi);
  patch('SAP Solman', sol);
  patch('Email (IMAP)', mail);
  res.json(updated);
}

async function getSourceSummary(req, res) {
  const glpi = await glpiGetCounts();
  const sol = await solmanGetCounts();
  const mail = await emailGetCounts();
  let updated = [...sourceSummary];
  const patch = (name, data) => {
    if (!data) return;
    const idx = updated.findIndex(s => s.name.toLowerCase() === name.toLowerCase());
    if (idx >= 0) {
      updated[idx] = {
        ...updated[idx],
        new: data.new ?? updated[idx].new,
        open: data.open ?? updated[idx].open,
        resolved: data.resolved ?? updated[idx].resolved,
        queue: data.queue ?? updated[idx].queue,
      };
    }
  };
  patch('GLPI', glpi);
  patch('Solman', sol);
  patch('Email', mail);
  res.json(updated);
}

function getSyncLogs(req, res) {
  res.json(syncLogs);
}

function getAlerts(req, res) {
  res.json(alerts);
}

function postResync(req, res) {
  const { source } = req.body || {};
  if (!source || !['GLPI', 'Solman', 'Email'].includes(source)) {
    return res.status(400).json({ error: 'Invalid source' });
  }
  const result = resyncSource(source);
  res.json({ success: true, itemsProcessed: result.itemsProcessed });
}

function postAlertsRetry(req, res) {
  const { source } = req.body || {};
  if (!source || !['GLPI', 'Solman', 'Email'].includes(source)) {
    return res.status(400).json({ error: 'Invalid source' });
  }
  const idxs = [];
  for (let i = alerts.length - 1; i >= 0; i--) {
    if (alerts[i].source === source) idxs.push(i);
  }
  idxs.forEach(i => alerts.splice(i, 1));
  res.json({ success: true });
}

module.exports = {
  getConnectors,
  getSourceSummary,
  getSyncLogs,
  getAlerts,
  postResync,
  postAlertsRetry,
};