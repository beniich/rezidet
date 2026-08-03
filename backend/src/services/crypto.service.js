const { Client, resources, Webhook } = require('coinbase-commerce-node');
const prisma = require('../config/database');

class CryptoService {
  constructor() {
    // Only init if API key exists to avoid crash
    if (process.env.COINBASE_COMMERCE_API_KEY) {
      Client.init(process.env.COINBASE_COMMERCE_API_KEY);
    }
    this.webhookSecret = process.env.COINBASE_WEBHOOK_SECRET;
  }

  async createCharge({ amount, currency, tenantId, description, metadata = {} }) {
    if (!process.env.COINBASE_COMMERCE_API_KEY) throw new Error('Coinbase Commerce API key missing');
    const chargeData = {
      name: `CAFM Pro - ${description || 'Paiement'}`,
      description: description || 'Recharge de crédits CAFM Pro',
      local_price: { amount: amount.toFixed(2), currency: currency.toUpperCase() },
      pricing_type: 'fixed_price',
      metadata: { tenantId, ...metadata },
      redirect_url: `${process.env.APP_URL || 'http://localhost:5173'}/dashboard/billing?crypto_success=true`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:5173'}/dashboard/billing`
    };

    const charge = await resources.Charge.create(chargeData);

    await prisma.cryptoPayment.create({
      data: {
        tenantId, coinbaseChargeId: charge.id, chargeCode: charge.code,
        amount, currency, status: 'PENDING', description, metadata: JSON.stringify(metadata),
        expiresAt: new Date(charge.expires_at)
      }
    });

    return {
      chargeId: charge.id, chargeCode: charge.code, hostedUrl: charge.hosted_url,
      addresses: charge.addresses, expiresAt: charge.expires_at
    };
  }

  async checkChargeStatus(chargeId) {
    if (!process.env.COINBASE_COMMERCE_API_KEY) return null;
    const charge = await resources.Charge.retrieve(chargeId);
    const status = charge.timeline[charge.timeline.length - 1]?.status || 'PENDING';

    await prisma.cryptoPayment.update({
      where: { coinbaseChargeId: chargeId },
      data: {
        status: status.toUpperCase(), confirmedAt: status === 'COMPLETED' ? new Date() : null,
        txHash: charge.payments?.[0]?.transaction_id,
        cryptoCurrency: charge.payments?.[0]?.network || charge.payments?.[0]?.value?.crypto?.currency,
        amountCrypto: charge.payments?.[0]?.value?.crypto?.amount
      }
    });

    if (status === 'COMPLETED') {
      const payment = await prisma.cryptoPayment.findUnique({ where: { coinbaseChargeId: chargeId } });
      const creditService = require('./credit.service');
      await creditService.deposit(payment.tenantId, payment.amount);
    }
    return charge;
  }

  async handleWebhook(req, res) {
    const signature = req.headers['x-cc-webhook-signature'];
    let event;
    try {
      event = Webhook.verifySigBody(req.rawBody, signature, this.webhookSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'charge:confirmed': await this.checkChargeStatus(event.data.id); break;
      case 'charge:failed':
        await prisma.cryptoPayment.update({ where: { coinbaseChargeId: event.data.id }, data: { status: 'FAILED' } });
        break;
    }
    res.json({ received: true });
  }

  async getExchangeRates(baseCurrency = 'EUR') {
    try {
      const resp = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${baseCurrency}`);
      const data = await resp.json();
      return data.data.rates;
    } catch (err) {
      return { BTC: '0.000011', ETH: '0.00031', USDC: '1.10', DAI: '1.10' };
    }
  }
}

module.exports = new CryptoService();
