const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/marketplace.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/items', authMiddleware, ctrl.listItems);
router.post('/items/:itemId/install', authMiddleware, ctrl.install);
router.post('/items', authMiddleware, ctrl.submitItem);
router.get('/vendor/stats', authMiddleware, ctrl.getVendorStats);

module.exports = router;
