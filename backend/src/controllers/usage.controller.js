const prisma = require('../config/database');

function getUnit(metric) {
  const units = {
    api_call: 'count',
    storage_mb: 'mb',
    ai_request: 'count',
    iot_message: 'count',
    export_pdf: 'count',
    email_sent: 'count'
  };
  return units[metric] || 'count';
}

/**
 * Vérifier si l'organisation dépasse les limites
 */
async function checkLimits(tenantId, metric) {
  const subscription = await prisma.subscription.findUnique({
    where: { tenantId }
  });

  const limits = {
    PRO: {
      api_call: 50000,
      storage_mb: 10000,
      ai_request: 1000,
      iot_message: 100000
    },
    ENTERPRISE: {
      api_call: -1,
      storage_mb: -1,
      ai_request: -1,
      iot_message: -1
    },
    FREE: {
      api_call: 1000,
      storage_mb: 100,
      ai_request: 10,
      iot_message: 1000
    }
  };

  const planLimits = limits[subscription?.plan || 'FREE'];
  const limit = planLimits[metric];

  if (limit === -1) return; // Illimité

  const period = new Date().toISOString().slice(0, 7);
  const usage = await prisma.usageRecord.aggregate({
    where: { tenantId, metric, billingPeriod: period },
    _sum: { quantity: true }
  });

  const total = usage._sum.quantity || 0;
  
  if (total > limit * 0.8 && total <= limit) {
    // Notification 80% (simulé ici)
    console.log(`Warning: ${metric} limit at 80% for tenant ${tenantId}`);
  } else if (total > limit) {
    // Bloquer l'action
    throw new Error(`Limite ${metric} atteinte. Veuillez upgrader votre plan.`);
  }
}

/**
 * Tracking de l'usage en temps réel
 */
exports.trackUsage = async (tenantId, metric, quantity = 1) => {
  const period = new Date().toISOString().slice(0, 7);

  await prisma.usageRecord.create({
    data: {
      tenantId,
      metric,
      quantity,
      unit: getUnit(metric),
      billingPeriod: period
    }
  });

  // Vérifier les limites
  await checkLimits(tenantId, metric);
};

function getLimit(plan, metric) {
  const limits = {
    PRO: { api_call: 50000, storage_mb: 10000, ai_request: 1000, iot_message: 100000 },
    ENTERPRISE: { api_call: -1, storage_mb: -1, ai_request: -1, iot_message: -1 },
    FREE: { api_call: 1000, storage_mb: 100, ai_request: 10, iot_message: 1000 }
  };
  return limits[plan]?.[metric] || 0;
}

/**
 * Rapport d'usage mensuel
 */
exports.getUsageReport = async (req, res) => {
  const { period = new Date().toISOString().slice(0, 7) } = req.query;
  
  const usage = await prisma.usageRecord.groupBy({
    by: ['metric'],
    where: { tenantId: req.user.tenantId, billingPeriod: period },
    _sum: { quantity: true }
  });

  // Calculer les coûts overage
  const overageCosts = {
    api_call: 0.0001, // 0.01 centime par appel supplémentaire
    ai_request: 0.05,  // 5 centimes par requête IA
    storage_mb: 0.001,  // 0.1 centime par MB
    iot_message: 0.00001
  };

  const subscription = await prisma.subscription.findUnique({
    where: { tenantId: req.user.tenantId }
  });

  const report = usage.map(u => {
    const limit = getLimit(subscription?.plan, u.metric);
    const used = u._sum.quantity || 0;
    const overage = limit > 0 ? Math.max(0, used - limit) : 0;
    const cost = overage * (overageCosts[u.metric] || 0);

    return {
      metric: u.metric,
      used,
      limit: limit === -1 ? null : limit,
      overage,
      cost
    };
  });

  res.json({ period, subscription: subscription?.plan, usage: report });
};
