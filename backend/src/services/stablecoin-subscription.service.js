const { ethers } = require('ethers');
const prisma = require('../config/database');

const SUBSCRIPTION_MANAGER_ABI = [
  "function createSubscription(address recipient, address token, uint256 amount, uint256 interval) external returns (uint256)",
  "function executeSubscription(uint256 subscriptionId) external",
  "function cancelSubscription(uint256 subscriptionId) external"
];
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transfer(address to, uint256 amount) external returns (bool)"
];

class StablecoinSubscriptionService {
  constructor() {
    this.providers = {
      polygon: process.env.POLYGON_RPC ? new ethers.JsonRpcProvider(process.env.POLYGON_RPC) : null
    };
    this.tokens = {
      USDC: { polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' }
    };
  }

  async createSubscription({ tenantId, plan, payerAddress, network = 'polygon' }) {
    const planPricing = { PRO: { amount: 49, interval: 30 * 24 * 60 * 60 }, ENTERPRISE: { amount: 199, interval: 30 * 24 * 60 * 60 } };
    const { amount, interval } = planPricing[plan];
    return prisma.stablecoinSubscription.create({
      data: {
        tenantId, plan, amountUsdc: amount, network, paymentToken: 'USDC',
        paymentTokenAddress: this.tokens.USDC[network], subscriberAddress: payerAddress,
        recipientAddress: process.env.RECIPIENT_WALLET_ADDRESS || '0x0000000000000000000000000000000000000000',
        status: 'PENDING', nextPaymentAt: new Date(Date.now() + interval * 1000)
      }
    });
  }
}

module.exports = new StablecoinSubscriptionService();
