const { ethers } = require('ethers');
const prisma = require('../config/database');

const PRICE_FEEDS = {
  1: { 'ETH/USD': '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', 'BTC/USD': '0xF4030086522a5bEEa4980FF8d5b48116FE92305', 'LINK/USD': '0x2c1d072e956AFFC0D019Cb7A2E97c08A0AA01106', 'EUR/USD': '0xb49f677943BC038e985720dE83D5aDA66a66869F', 'USDC/USD': '0x8fFfF1784bdb391B246f691D5AF9f3E3aA187d49' },
  137: { 'MATIC/USD': '0xAB84692f1d35B9081c4a4ad4F77B3a10aA9E4D7e', 'ETH/USD': '0xF9680D99D6C9589e2a93a48f61242AA9073b6f72', 'USDC/USD': '0xfE4A8cc5b5e2366A9730a744EAFeA938f04D7C09', 'BTC/USD': '0xc907E11674c3f3a0b4396A4b2294b8B14ac0064c' },
  8453: { 'ETH/USD': '0x71041dddad35946F9eD639ced9A6FBDBa7923DB89', 'USDC/USD': '0x7e8600BBE73b5bA0E0b22b2C83240CC68b7aA8080' }
};

class OracleService {
  constructor() {
    this.providers = {
      1: process.env.ETHEREUM_RPC ? new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC) : null,
      137: process.env.POLYGON_RPC ? new ethers.JsonRpcProvider(process.env.POLYGON_RPC) : null,
      8453: process.env.BASE_RPC ? new ethers.JsonRpcProvider(process.env.BASE_RPC) : null
    };
    
    this.contracts = {};
    for (const [chainId, feeds] of Object.entries(PRICE_FEEDS)) {
      this.contracts[chainId] = {};
      if (!this.providers[chainId]) continue;
      for (const [pair, address] of Object.entries(feeds)) {
        this.contracts[chainId][pair] = new ethers.Contract(
          address,
          ['function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)', 'function decimals() view returns (uint8)'],
          this.providers[chainId]
        );
      }
    }
  }

  async getPrice(pair, chainId = 1) {
    try {
      const contract = this.contracts[chainId]?.[pair];
      if (!contract) throw new Error(`Pair ${pair} non supporté sur chain ${chainId}`);

      const [roundId, answer, startedAt, updatedAt, answeredInRound] = await contract.latestRoundData();
      const decimals = await contract.decimals();

      const age = Math.floor(Date.now() / 1000) - Number(updatedAt);
      return {
        pair, chainId: Number(chainId), price: Number(answer) / Math.pow(10, decimals),
        rawPrice: answer.toString(), decimals: Number(decimals), timestamp: Number(updatedAt),
        ageSeconds: age, isStale: age > 3600
      };
    } catch (err) {
      return this.getFallbackPrice(pair);
    }
  }

  async getFallbackPrice(pair) {
    const ids = { 'ETH/USD': 'ethereum', 'BTC/USD': 'bitcoin', 'MATIC/USD': 'matic-network', 'USDC/USD': 'usd-coin', 'LINK/USD': 'chainlink', 'EUR/USD': null };
    const id = ids[pair];
    if (!id) return { pair, price: 0, source: 'fallback', timestamp: Math.floor(Date.now() / 1000) };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
      const data = await response.json();
      return { pair, price: data[id].usd, source: 'coingecko', timestamp: Math.floor(Date.now() / 1000) };
    } catch {
      return { pair, price: 0, source: 'error', timestamp: Math.floor(Date.now() / 1000) };
    }
  }

  async getMultiplePrices(pairs, chainId = 1) {
    return Promise.all(pairs.map(p => this.getPrice(p, chainId)));
  }

  async setupPriceAlert({ userId, pair, threshold, direction, chainId = 1 }) {
    return prisma.priceAlert.create({ data: { userId, pair, chainId, threshold, direction, active: true } });
  }

  async checkAlerts() {
    const alerts = await prisma.priceAlert.findMany({ where: { active: true } });
    const triggered = [];
    for (const alert of alerts) {
      const priceData = await this.getPrice(alert.pair, alert.chainId);
      const triggered_alert = (alert.direction === 'above' && priceData.price >= alert.threshold) || (alert.direction === 'below' && priceData.price <= alert.threshold);
      if (triggered_alert) {
        triggered.push({ alert, priceData });
        await prisma.priceAlert.update({ where: { id: alert.id }, data: { active: false, triggeredAt: new Date() } });
      }
    }
    return triggered;
  }

  async recordHistoricalPrice(pair, chainId, price) {
    return prisma.priceHistory.create({ data: { pair, chainId, price, timestamp: new Date() } });
  }
}

module.exports = new OracleService();
