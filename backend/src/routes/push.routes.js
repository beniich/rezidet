const router = require('express').Router();
const pushService = require('../services/web-push.service');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

// POST /api/push/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    await pushService.subscribe(req.user.userId, req.body, req.headers['user-agent']);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/push/unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { endpoint } = req.body;
    if (endpoint) {
      await require('../config/database').pushSubscription.updateMany({
        where: { endpoint },
        data: { active: false }
      });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/push/test (dev only)
router.post('/test', async (req, res) => {
  try {
    const sent = await pushService.sendToUser(req.user.userId, {
      title: '🧪 Test CAFM Pro',
      body: 'Les notifications push fonctionnent correctement !',
      url: '/dashboard',
      tag: 'test'
    });
    res.json({ sent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
