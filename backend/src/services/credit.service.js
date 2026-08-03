const prisma = require('../config/database');

class CreditService {
  async getOrCreateAccount(tenantId) {
    let account = await prisma.creditAccount.findUnique({ where: { tenantId } });
    if (!account) account = await prisma.creditAccount.create({ data: { tenantId } });
    return account;
  }

  async deposit(tenantId, amount, paymentIntentId = null) {
    if (amount <= 0) throw new Error('Montant invalide');
    return prisma.$transaction(async (tx) => {
      const account = await this.getOrCreateAccount(tenantId);
      if (account.maxBalance && account.balance + amount > account.maxBalance) {
        throw new Error(`Solde max atteint (${account.maxBalance}€)`);
      }
      const newBalance = account.balance + amount;
      await tx.creditAccount.update({
        where: { tenantId }, data: { balance: newBalance, totalDeposited: { increment: amount } }
      });
      await tx.creditTransaction.create({
        data: { accountId: account.id, type: 'DEPOSIT', amount, balanceAfter: newBalance, description: `Dépôt de ${amount}€`, stripePaymentIntentId: paymentIntentId, category: 'DEPOSIT' }
      });
      return { newBalance };
    });
  }

  async spend(tenantId, amount, category, description, reference = null) {
    if (amount <= 0) throw new Error('Montant invalide');
    const result = await prisma.$transaction(async (tx) => {
      const account = await this.getOrCreateAccount(tenantId);
      if (account.balance < amount) throw new Error(`Solde insuffisant (${account.balance}€ disponible)`);
      const newBalance = account.balance - amount;
      await tx.creditAccount.update({
        where: { tenantId }, data: { balance: newBalance, totalSpent: { increment: amount }, lifetimeUsage: { increment: 1 } }
      });
      await tx.creditTransaction.create({
        data: { accountId: account.id, type: 'SPEND', amount: -amount, balanceAfter: newBalance, description, category, reference }
      });
      return { newBalance, spent: amount };
    });
    await this.checkAutoRecharge(tenantId);
    return result;
  }

  async refund(tenantId, amount, reference) {
    return prisma.$transaction(async (tx) => {
      const account = await this.getOrCreateAccount(tenantId);
      const newBalance = account.balance + amount;
      await tx.creditAccount.update({ where: { tenantId }, data: { balance: newBalance } });
      await tx.creditTransaction.create({
        data: { accountId: account.id, type: 'REFUND', amount, balanceAfter: newBalance, description: `Remboursement: ${reference}`, reference }
      });
      return { newBalance };
    });
  }

  async checkAutoRecharge(tenantId) {
    const account = await this.getOrCreateAccount(tenantId);
    if (!account.autoRechargeEnabled || account.balance > account.autoRechargeThreshold || !account.autoRechargePaymentMethodId) return;

    const { stripe } = require('../config/stripe');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(account.autoRechargeAmount * 100), currency: 'eur',
      customer: account.autoRechargePaymentMethodId, payment_method: account.autoRechargePaymentMethodId,
      off_session: true, confirm: true, description: `Auto-recharge ${account.autoRechargeAmount}€`,
      metadata: { tenantId, type: 'auto_recharge' }
    });
    if (paymentIntent.status === 'succeeded') {
      await this.deposit(tenantId, account.autoRechargeAmount, paymentIntent.id);
    }
  }

  async chargeUsage(tenantId, metric, quantity) {
    const pricing = await prisma.usagePricing.findUnique({ where: { metric } });
    if (!pricing) throw new Error(`Pricing non défini pour ${metric}`);
    const cost = quantity * pricing.unitCost;
    if (cost <= 0) return { cost: 0, charged: false };
    await this.spend(tenantId, cost, metric.toUpperCase(), `${quantity} ${pricing.unit} × ${pricing.unitCost}€`, metric);
    return { cost, charged: true };
  }
}

module.exports = new CreditService();
