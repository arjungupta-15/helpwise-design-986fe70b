const { Router } = require('express');
const ctrl = require('../controllers/ingestionController');

const router = Router();

router.get('/connectors', ctrl.getConnectors);
router.get('/source-summary', ctrl.getSourceSummary);
router.get('/sync-logs', ctrl.getSyncLogs);
router.get('/alerts', ctrl.getAlerts);
router.post('/resync', ctrl.postResync);
router.post('/alerts/retry', ctrl.postAlertsRetry);

module.exports = router;