const { stripe } = require('../config/stripe');
const prisma = require('../config/database');

class StripeConnectService {
  async createExpressAccount(vendorId, country = 'FR', email) {
    const account = await stripe.accounts.create({
      type: 'express',
      country,
      email,
      capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
      business_type: 'individual',
      metadata: { vendorId }
    });

    const vendorAccount = await prisma.vendorAccount.create({
      data: {
        vendorId, stripeAccountId: account.id, accountType: 'express', country,
        defaultCurrency: country === 'US' ? 'usd' : country === 'GB' ? 'gbp' : 'eur'
      }
    });
    return { account, vendorAccount };
  }

  async createOnboardingLink(vendorId) {
    const account = await prisma.vendorAccount.findUnique({ where: { vendorId } });
    if (!account) throw new Error('Compte vendor non trouvé');
    const link = await stripe.accountLinks.create({
      account: account.stripeAccountId,
      refresh_url: `${process.env.APP_URL}/vendor/onboarding/refresh`,
      return_url: `${process.env.APP_URL}/vendor/onboarding/complete`,
      type: 'account_onboarding'
    });
    return link.url;
  }

  async syncAccountStatus(vendorId) {
    const account = await prisma.vendorAccount.findUnique({ where: { vendorId } });
    if (!account) throw new Error('Compte non trouvé');
    const stripeAccount = await stripe.accounts.retrieve(account.stripeAccountId);
    await prisma.vendorAccount.update({
      where: { vendorId },
      data: {
        chargesEnabled: stripeAccount.charges_enabled,
        payoutsEnabled: stripeAccount.payouts_enabled,
        detailsSubmitted: stripeAccount.details_submitted,
        requirementsDue: (stripeAccount.requirements?.currently_due || []).join(',')
      }
    });
    return stripeAccount;
  }

  async createMarketplacePayment({ amount, currency, vendorStripeAccountId, platformFeePercent, metadata, customerId }) {
    const applicationFee = Math.round(amount * platformFeePercent);
    return stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency, customer: customerId,
      application_fee_amount: applicationFee,
      transfer_data: { destination: vendorStripeAccountId },
      metadata, automatic_payment_methods: { enabled: true }
    });
  }

  async purchaseMarketplaceItem(itemId, tenantId, userId) {
    const item = await prisma.marketplaceItem.findUnique({
      where: { id: itemId }, include: { vendor: { include: { accounts: true } } }
    });
    if (!item) throw new Error('Item non trouvé');
    if (!item.vendor.accounts[0]?.chargesEnabled) throw new Error('Vendor pas encore onboardé');

    const sub = await prisma.subscription.findUnique({ where: { tenantId } });
    return this.createMarketplacePayment({
      amount: item.price, currency: item.currency.toLowerCase(),
      vendorStripeAccountId: item.vendor.accounts[0].stripeAccountId,
      platformFeePercent: 0.30,
      customerId: sub?.stripeCustomerId,
      metadata: { itemId, tenantId, userId, type: 'marketplace_purchase' }
    });
  }

  async handlePaymentSucceeded(paymentIntent) {
    if (paymentIntent.metadata?.type !== 'marketplace_purchase') return;
    const { itemId, tenantId, vendorId } = paymentIntent.metadata;
    const amount = paymentIntent.amount / 100;
    const applicationFee = paymentIntent.application_fee_amount / 100;
    const vendorAmount = amount - applicationFee;

    await prisma.$transaction([
      prisma.vendorBalanceTransaction.create({
        data: {
          vendorId, type: 'CHARGE', amount: vendorAmount, currency: paymentIntent.currency,
          description: \`Sale: \${paymentIntent.metadata.itemName || 'Marketplace item'}\`,
          reference: paymentIntent.id, availableOn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        }
      }),
      prisma.marketplaceItem.update({
        where: { id: itemId }, data: { installs: { increment: 1 } }
      })
    ]);
    await this.updateVendorBalance(vendorId);
  }

  async requestPayout(vendorId, amount, currency = 'EUR') {
    const account = await prisma.vendorAccount.findUnique({ where: { vendorId } });
    if (!account?.payoutsEnabled) throw new Error('Payouts non activés pour ce vendor');
    if (amount < account.minimumPayout) throw new Error(\`Montant minimum: \${account.minimumPayout}€\`);

    const payout = await stripe.payouts.create({
      amount: Math.round(amount * 100), currency: currency.toLowerCase(),
      stripeAccount: account.stripeAccountId, method: 'standard'
    });

    await prisma.vendorPayout.create({
      data: {
        vendorId, accountId: account.id, amount, currency,
        stripePayoutId: payout.id, status: payout.status.toUpperCase(),
        arrivalDate: new Date(payout.arrival_date * 1000)
      }
    });

    await prisma.vendorBalanceTransaction.create({
      data: { vendorId, type: 'PAYOUT', amount: -amount, currency, description: 'Payout to bank', reference: payout.id }
    });
    await this.updateVendorBalance(vendorId);
    return payout;
  }

  async updateVendorBalance(vendorId) {
    const account = await prisma.vendorAccount.findUnique({ where: { vendorId } });
    if(!account) return;
    const balance = await stripe.balance.retrieve({ stripeAccount: account.stripeAccountId });
    const available = balance.available.find(b => b.currency === account.defaultCurrency)?.amount || 0;
    const pending = balance.pending.find(b => b.currency === account.defaultCurrency)?.amount || 0;
    await prisma.vendorAccount.update({
      where: { vendorId }, data: { availableBalance: available / 100, pendingBalance: pending / 100 }
    });
  }
}

module.exports = new StripeConnectService();
