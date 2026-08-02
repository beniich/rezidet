const router = require('express').Router();
const ctrl = require('../controllers/public.controller');

router.get('/stats', ctrl.getStats);
router.get('/pricing', ctrl.getPricing);
router.post('/contact', ctrl.submitContact);

module.exports = router;
