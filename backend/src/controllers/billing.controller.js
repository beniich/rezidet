const { stripe, stripeConfig } = require('../config/stripe');
const prisma = require('../config/database');

/**
 * Calculer l'usage en cours
 */
async function getCurrentUsage(tenantId) {
  const period = new Date().toISOString().slice(0, 7); // "2025-01"
  
  const usage = await prisma.usageRecord.groupBy({
    by: ['metric'],
    where: { tenantId, billingPeriod: period },
    _sum: { quantity: true }
  });

  const limits = {
    PRO: { api_calls: 50000, storage_mb: 10000, ai_requests: 1000 },
    ENTERPRISE: { api_calls: -1, storage_mb: -1, ai_requests: -1 },
    FREE: { api_calls: 1000, storage_mb: 100, ai_requests: 10 }
  };

  const sub = await prisma.subscription.findUnique({ where: { tenantId } });
  const planLimits = limits[sub?.plan || 'FREE'] || limits['FREE'];

  return {
    api_calls: { used: usage.find(u => u.metric === 'api_call')?._sum.quantity || 0, limit: planLimits.api_calls },
    storage_mb: { used: usage.find(u => u.metric === 'storage_mb')?._sum.quantity || 0, limit: planLimits.storage_mb },
    ai_requests: { used: usage.find(u => u.metric === 'ai_request')?._sum.quantity || 0, limit: planLimits.ai_requests }
  };
}

/**
 * Créer une session de checkout Stripe
 */
exports.createCheckoutSession = async (req, res) => {
  try {
    const { plan, billingPeriod = 'monthly' } = req.body;
    const org = await prisma.tenant.findUnique({
      where: { id: req.user.tenantId },
      include: { users: { where: { role: 'SUPERADMIN' }, take: 1 } }
    });

    const owner = org.users[0] || req.user;

    // Créer ou récupérer le customer Stripe
    let subscription = await prisma.subscription.findUnique({
      where: { tenantId: org.id }
    });

    if (!subscription?.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: owner.email,
        name: org.name,
        metadata: { tenantId: org.id }
      });
      
      subscription = await prisma.subscription.upsert({
        where: { tenantId: org.id },
        update: { stripeCustomerId: customer.id },
        create: {
          tenantId: org.id,
          stripeCustomerId: customer.id,
          plan: 'FREE',
          status: 'active'
        }
      });
    }

    // Sélectionner le prix
    const priceId = billingPeriod === 'yearly'
      ? (plan === 'PRO' ? stripeConfig.prices.PRO_YEARLY : stripeConfig.prices.ENTERPRISE_YEARLY)
      : (plan === 'PRO' ? stripeConfig.prices.PRO_MONTHLY : stripeConfig.prices.ENTERPRISE_MONTHLY);

    // Créer la session
    const session = await stripe.checkout.sessions.create({
      customer: subscription.stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings`,
      subscription_data: {
        trial_period_days: 14,
        metadata: { tenantId: org.id, plan }
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required'
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Portail client Stripe (gérer abonnement)
 */
exports.createPortalSession = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { tenantId: req.user.tenantId }
    });

    if (!subscription?.stripeCustomerId) {
      return res.status(400).json({ error: 'Aucun abonnement actif' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.APP_URL || 'http://localhost:5173'}/dashboard/settings`
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Récupérer les informations de facturation
 */
exports.getBillingInfo = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { tenantId: req.user.tenantId }
    });

    const [invoices, paymentMethods, usage] = await Promise.all([
      prisma.invoice.findMany({
        where: { tenantId: req.user.tenantId },
        orderBy: { createdAt: 'desc' },
        take: 12
      }),
      prisma.paymentMethod.findMany({
        where: { tenantId: req.user.tenantId }
      }),
      getCurrentUsage(req.user.tenantId)
    ]);

    res.json({
      subscription: subscription || { plan: 'FREE', status: 'active' },
      invoices,
      paymentMethods,
      usage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Webhook Stripe (événements paiement)
 */
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody || req.body,
      sig,
      stripeConfig.webhookSecret
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gestion des événements
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
    case 'invoice.paid':
      await handleInvoicePaid(event.data.object);
      break;
  }

  res.json({ received: true });
};

async function handleCheckoutCompleted(session) {
  const tenantId = session.metadata?.tenantId || session.subscription_data?.metadata?.tenantId;
  if (!tenantId) return;

  await prisma.subscription.update({
    where: { tenantId },
    data: {
      stripeSubscriptionId: session.subscription,
      plan: session.metadata?.plan || 'PRO',
      status: 'active'
    }
  });
}

async function handleSubscriptionUpdated(subscription) {
  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end
    }
  });
}

async function handleSubscriptionDeleted(subscription) {
  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'canceled',
      canceledAt: new Date(),
      plan: 'FREE'
    }
  });
}

async function handleInvoicePaid(invoice) {
  const tenantId = invoice.metadata?.tenantId || invoice.subscription_data?.metadata?.tenantId;
  if (!tenantId) return;

  await prisma.invoice.create({
    data: {
      tenantId,
      stripeInvoiceId: invoice.id,
      number: invoice.number || 'INV',
      status: 'paid',
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      amountPaid: invoice.amount_paid / 100,
      periodStart: new Date(invoice.period_start * 1000),
      periodEnd: new Date(invoice.period_end * 1000),
      pdfUrl: invoice.invoice_pdf,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
      paidAt: new Date()
    }
  });
}
