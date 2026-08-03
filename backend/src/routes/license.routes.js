const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/license.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// Public route to validate a key
router.post('/validate', ctrl.validateKey);

// Admin routes
router.get('/', authMiddleware, ctrl.listKeys);
router.post('/generate', authMiddleware, ctrl.generateKeys);

module.exports = router;
