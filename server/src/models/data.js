// In-memory demo state (fallback when env integration not configured)

const statusColors = ['online', 'offline', 'degraded'];

let connectors = [
  { name: 'GLPI', status: 'online', lastSync: 'Today 10:12', successes: 154, failures: 2 },
  { name: 'SAP Solman', status: 'degraded', lastSync: 'Today 09:55', successes: 89, failures: 7 },
  { name: 'Email (IMAP)', status: 'online', lastSync: 'Today 10:20', successes: 231, failures: 1 },
];

let sourceSummary = [
  { name: 'GLPI', new: 18, open: 120, resolved: 45, queue: 7 },
  { name: 'Solman', new: 11, open: 86, resolved: 34, queue: 12 },
  { name: 'Email', new: 27, open: 73, resolved: 29, queue: 5 },
];

let syncLogs = [
  { time: '10:20', source: 'Email', items: 32, status: 'online', duration: '3.4s' },
  { time: '10:12', source: 'GLPI', items: 21, status: 'online', duration: '2.1s' },
  { time: '09:55', source: 'Solman', items: 17, status: 'degraded', duration: '7.8s' },
  { time: '09:35', source: 'Email', items: 28, status: 'online', duration: '3.2s' },
];

let alerts = [
  { id: 'alert-1', source: 'Solman', level: 'warning', message: 'API rate limited – retries scheduled' },
];

function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function mapSourceToConnectorName(source) {
  if (source === 'Solman') return 'SAP Solman';
  if (source === 'Email') return 'Email (IMAP)';
  return 'GLPI';
}

function resyncSource(source) {
  const items = Math.floor(Math.random() * 25) + 5;
  const status = source === 'Solman' ? 'degraded' : 'online';
  const hhmm = nowHHMM();

  syncLogs.unshift({ time: hhmm, source, items, status, duration: `${(Math.random() * 5 + 1).toFixed(1)}s` });

  const connName = mapSourceToConnectorName(source);
  connectors = connectors.map(c => (c.name === connName
    ? { ...c, lastSync: `Today ${hhmm}`, successes: c.successes + items, failures: c.failures + (status === 'online' ? 0 : 1), status }
    : c));

  const idx = sourceSummary.findIndex(s => s.name.toLowerCase() === source.toLowerCase());
  if (idx >= 0) {
    sourceSummary[idx] = {
      ...sourceSummary[idx],
      new: sourceSummary[idx].new + Math.floor(items / 3),
      queue: Math.max(0, sourceSummary[idx].queue - Math.floor(items / 4)),
    };
  }

  return { itemsProcessed: items };
}

module.exports = {
  statusColors,
  connectors,
  sourceSummary,
  syncLogs,
  alerts,
  nowHHMM,
  mapSourceToConnectorName,
  resyncSource,
};