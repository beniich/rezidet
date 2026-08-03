const { stripe, stripeConfig } = require('../config/stripe');
const prisma = require('../config/database');

/**
 * Mise à niveau (upgrade) avec calcul de prorata
 */
exports.upgradePlan = async (req, res) => {
  try {
    const { newPlan, billingPeriod = 'monthly' } = req.body;
    const subscription = await prisma.subscription.findUnique({
      where: { tenantId: req.user.tenantId }
    });

    if (!subscription?.stripeSubscriptionId) {
      return res.status(400).json({ error: 'Aucun abonnement actif. Utilisez /billing/checkout.' });
    }

    const currentSub = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);
    const currentItem = currentSub.items.data[0];

    const newPriceId = billingPeriod === 'yearly'
      ? (newPlan === 'PRO' ? stripeConfig.prices.PRO_YEARLY : stripeConfig.prices.ENTERPRISE_YEARLY)
      : (newPlan === 'PRO' ? stripeConfig.prices.PRO_MONTHLY : stripeConfig.prices.ENTERPRISE_MONTHLY);

    // Calculer le prorata (preview)
    const proration = await stripe.invoices.retrieveUpcoming({
      customer: subscription.stripeCustomerId,
      subscription: subscription.stripeSubscriptionId,
      subscription_items: [{ id: currentItem.id, price: newPriceId }],
      subscription_proration_behavior: 'create_prorations'
    });

    // Appliquer le changement
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      items: [{ id: currentItem.id, price: newPriceId }],
      proration_behavior: 'create_prorations',
      payment_behavior: 'pending_if_incomplete'
    });

    await prisma.subscription.update({
      where: { tenantId: req.user.tenantId },
      data: { plan: newPlan, stripePriceId: newPriceId }
    });

    res.json({
      success: true,
      prorationAmount: proration.amount_due / 100,
      currency: proration.currency,
      newPlan,
      message: proration.amount_due > 0
        ? `Upgrade effectué. ${(proration.amount_due / 100).toFixed(2)}€ seront débités au prorata.`
        : 'Upgrade effectué sans frais.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Rétrogradation (downgrade) à la fin de période
 */
exports.downgradePlan = async (req, res) => {
  try {
    const { newPlan, billingPeriod = 'monthly' } = req.body;
    const subscription = await prisma.subscription.findUnique({
      where: { tenantId: req.user.tenantId }
    });

    if (!subscription?.stripeSubscriptionId) {
      return res.status(400).json({ error: 'Aucun abonnement actif' });
    }

    const currentSub = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);

    const newPriceId = billingPeriod === 'yearly'
      ? (newPlan === 'PRO' ? stripeConfig.prices.PRO_YEARLY : stripeConfig.prices.ENTERPRISE_YEARLY)
      : (newPlan === 'PRO' ? stripeConfig.prices.PRO_MONTHLY : stripeConfig.prices.ENTERPRISE_MONTHLY);

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      items: [{ id: currentSub.items.data[0].id, price: newPriceId }],
      proration_behavior: 'none',
      billing_cycle_anchor: 'unchanged'
    });

    res.json({
      success: true,
      message: `Downgrade programmé. Effectif au ${new Date(currentSub.current_period_end * 1000).toLocaleDateString('fr-FR')}.`,
      effectiveDate: currentSub.current_period_end
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Annuler l'abonnement
 */
exports.cancelSubscription = async (req, res) => {
  try {
    const { immediately = false } = req.body;
    const subscription = await prisma.subscription.findUnique({
      where: { tenantId: req.user.tenantId }
    });

    if (!subscription?.stripeSubscriptionId) {
      return res.status(400).json({ error: 'Aucun abonnement actif' });
    }

    if (immediately) {
      await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
    } else {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true
      });
    }

    await prisma.subscription.update({
      where: { tenantId: req.user.tenantId },
      data: {
        cancelAtPeriodEnd: !immediately,
        canceledAt: immediately ? new Date() : null
      }
    });

    res.json({
      success: true,
      message: immediately
        ? 'Abonnement annulé immédiatement.'
        : 'Annulation programmée à la fin de la période.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Réactiver un abonnement annulé
 */
exports.reactivateSubscription = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { tenantId: req.user.tenantId }
    });

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: false
    });

    await prisma.subscription.update({
      where: { tenantId: req.user.tenantId },
      data: { cancelAtPeriodEnd: false, canceledAt: null }
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Preview du coût d'un upgrade (prorata)
 */
exports.previewUpgrade = async (req, res) => {
  try {
    const { newPlan, billingPeriod = 'monthly' } = req.body;
    const subscription = await prisma.subscription.findUnique({
      where: { tenantId: req.user.tenantId }
    });

    if (!subscription?.stripeSubscriptionId) {
      return res.status(400).json({ error: 'Aucun abonnement' });
    }

    const currentSub = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);
    const currentItem = currentSub.items.data[0];

    const newPriceId = billingPeriod === 'yearly'
      ? (newPlan === 'PRO' ? stripeConfig.prices.PRO_YEARLY : stripeConfig.prices.ENTERPRISE_YEARLY)
      : (newPlan === 'PRO' ? stripeConfig.prices.PRO_MONTHLY : stripeConfig.prices.ENTERPRISE_MONTHLY);

    const upcoming = await stripe.invoices.retrieveUpcoming({
      customer: subscription.stripeCustomerId,
      subscription: subscription.stripeSubscriptionId,
      subscription_items: [{ id: currentItem.id, price: newPriceId }],
      subscription_proration_behavior: 'create_prorations'
    });

    res.json({
      immediateCharge: upcoming.amount_due / 100,
      currency: upcoming.currency,
      nextInvoiceAmount: upcoming.lines.data
        .filter(l => !l.proration)
        .reduce((sum, l) => sum + l.amount, 0) / 100,
      nextInvoiceDate: new Date(upcoming.period_end * 1000)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Récupérer l'abonnement complet
 */
exports.getSubscription = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { tenantId: req.user.tenantId }
    });
    res.json(subscription || { plan: 'FREE', status: 'active' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
