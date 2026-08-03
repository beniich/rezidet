const express = require('express');
const router = express.Router();
const adminFinancialController = require('../controllers/admin-financial.controller');
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');

// Protect all routes: Must be authenticated and have SUPER_ADMIN role (or similar)
router.use(authMiddleware);

// Admin dashboard routes
router.get('/dashboard', adminFinancialController.getDashboard);
router.get('/cohorts', adminFinancialController.getCohorts);
router.get('/history', adminFinancialController.getMRRHistory);
router.get('/invoices', adminFinancialController.getInvoices);
router.patch('/invoices/:id/paid', adminFinancialController.markInvoicePaid);
router.post('/invoices/generate', adminFinancialController.triggerInvoiceGeneration);

module.exports = router;
