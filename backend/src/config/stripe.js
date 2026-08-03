const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key');


/**
 * Configuration centrale Stripe
 */
const stripeConfig = {
  // Produits créés dans Stripe Dashboard
  products: {
    FREE: 'prod_free_xxx',
    PRO: 'prod_pro_xxx',
    ENTERPRISE: 'prod_enterprise_xxx'
  },
  
  // Prix par plan
  prices: {
    PRO_MONTHLY: 'price_pro_monthly_xxx',
    PRO_YEARLY: 'price_pro_yearly_xxx',
    ENTERPRISE_MONTHLY: 'price_ent_monthly_xxx',
    ENTERPRISE_YEARLY: 'price_ent_yearly_xxx'
  },

  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
};

module.exports = { stripe, stripeConfig };
