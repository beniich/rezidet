const router = require('express').Router();
const ctrl = require('../controllers/license.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// Public route for license validation at registration
router.get('/validate/:key', ctrl.validate);

// Protected admin routes
router.use(authMiddleware);
router.post('/generate', ctrl.generate);
router.get('/', ctrl.list);
router.get('/stats', ctrl.stats);
router.post('/:id/revoke', ctrl.revoke);
router.get('/export', ctrl.export);

module.exports = router;
