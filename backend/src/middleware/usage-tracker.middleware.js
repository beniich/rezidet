const prisma = require('../config/database');

/**
 * Middleware qui track l'usage API par organisation
 */
const trackUsage = (metric = 'api_call') => {
  return async (req, res, next) => {
    if (!req.user?.tenantId) return next();

    // Tracker après envoi de la réponse
    res.on('finish', async () => {
      try {
        const period = new Date().toISOString().slice(0, 7);
        await prisma.usageRecord.create({
          data: {
            tenantId: req.user.tenantId,
            metric,
            quantity: 1,
            unit: 'count',
            billingPeriod: period
          }
        });
      } catch (err) {
        console.error('Usage tracking error:', err);
      }
    });

    next();
  };
};

module.exports = trackUsage;
