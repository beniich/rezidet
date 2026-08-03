const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/billing.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// Routes protégées
router.post('/checkout', authMiddleware, ctrl.createCheckoutSession);
router.post('/portal', authMiddleware, ctrl.createPortalSession);
router.get('/info', authMiddleware, ctrl.getBillingInfo);

// Webhook (pas d'auth, signature Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), ctrl.handleWebhook);

module.exports = router;
