const prisma = require('../config/database');
const { stripe } = require('../config/stripe');

class MobilePaymentService {
  async createMobilePaymentIntent({ tenantId, amount, currency = 'EUR', plan }) {
    const sub = await prisma.subscription.findUnique({ where: { tenantId } });
    let customerId = sub?.stripeCustomerId;
    return { amount, currency, plan, customerId };
  }

  async confirmMobilePayment(tenantId, plan, paymentMethodId) {
    let sub = await prisma.subscription.findUnique({ where: { tenantId } });
    let customerId = sub?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({ payment_method: paymentMethodId });
      customerId = customer.id;
    }

    const priceIds = { PRO: 'price_pro', ENTERPRISE: 'price_ent' };
    const stripeSub = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceIds[plan] }],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent']
    });

    await prisma.subscription.update({
      where: { tenantId },
      data: { plan, status: 'active', stripeSubscriptionId: stripeSub.id, stripeCustomerId: customerId }
    });

    return stripeSub;
  }
}

module.exports = new MobilePaymentService();
