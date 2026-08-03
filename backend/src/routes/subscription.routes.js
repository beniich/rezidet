const express = require('express');
const router = express.Router();
const lifecycle = require('../controllers/subscription-lifecycle.controller');
const enterprise = require('../controllers/enterprise-quote.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// Lifecycle abonnement
router.get('/subscription', authMiddleware, lifecycle.getSubscription);
router.post('/upgrade', authMiddleware, lifecycle.upgradePlan);
router.post('/downgrade', authMiddleware, lifecycle.downgradePlan);
router.post('/cancel', authMiddleware, lifecycle.cancelSubscription);
router.post('/reactivate', authMiddleware, lifecycle.reactivateSubscription);
router.post('/preview', authMiddleware, lifecycle.previewUpgrade);

// Enterprise quotes (public, pas d'auth requise pour le formulaire)
router.post('/enterprise/quote/request', enterprise.requestQuote);
router.post('/enterprise/quote/calculate', enterprise.calculatePrice);

// Admin
router.get('/enterprise/quotes', authMiddleware, enterprise.listQuotes);
router.patch('/enterprise/quotes/:id/status', authMiddleware, enterprise.updateStatus);

module.exports = router;
