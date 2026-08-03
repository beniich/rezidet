const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/affiliate.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/become-partner', authMiddleware, ctrl.becomePartner);
router.get('/dashboard', authMiddleware, ctrl.getDashboard);
router.get('/ref/:code', ctrl.trackReferral);

module.exports = router;
