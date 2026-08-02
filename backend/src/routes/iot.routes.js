const router = require('express').Router();
const ctrl = require('../controllers/iot.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);
router.get('/sensors', ctrl.getSensors);
router.get('/network', ctrl.getNetworkTopology);

module.exports = router;
