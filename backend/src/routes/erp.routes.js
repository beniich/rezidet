const router = require('express').Router();
const ctrl = require('../controllers/erp.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/connections', ctrl.getConnections);
router.post('/connections', ctrl.createConnection);
router.post('/connections/:id/test', ctrl.testConnection);
router.post('/connections/:id/sync', ctrl.syncConnection);
router.get('/logs', ctrl.getSyncLogs);

module.exports = router;
