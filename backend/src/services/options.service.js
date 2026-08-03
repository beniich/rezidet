const { ethers } = require('ethers');
const prisma = require('../config/database');

const OPTIONS_ABI = [
  'function createOption(uint8 optionType, address underlying, uint256 strikePrice, uint256 premium, uint256 amount, uint256 durationDays) external returns (uint256)',
  'function purchaseOption(uint256 optionId) external',
  'function exerciseOption(uint256 optionId) external',
  'function getOption(uint256 optionId) external view returns (tuple)'
];

class OptionsService {
  constructor() {
    this.provider = process.env.POLYGON_RPC ? new ethers.JsonRpcProvider(process.env.POLYGON_RPC) : null;
    if (this.provider && process.env.OPTIONS_ADDRESS) {
      this.optionsContract = new ethers.Contract(process.env.OPTIONS_ADDRESS, OPTIONS_ABI, this.provider);
    }
  }

  async createOption({ writer, optionType, underlying, strikePrice, amount, durationDays, oracleService }) {
    let currentPrice = 3000 * 1e8; // Fallback mock
    if (oracleService) {
      try { currentPrice = (await oracleService.getPrice(`${underlying}/USD`, 137)).price * 1e8; } catch(e){}
    }
    const premium = this.calculateBlackScholes(currentPrice, strikePrice * 1e8, durationDays / 365, 0.05, 0.6, optionType === 'CALL' ? 'call' : 'put');

    return prisma.option.create({
      data: {
        writer, optionType, underlying, strikePrice, premium: premium / 1e8, amount,
        expiration: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000), status: 'OPEN'
      }
    });
  }

  calculateBlackScholes(S, K, T, r, sigma, type) {
    const N = (x) => {
      const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
      const p = 0.3275911; const sign = x < 0 ? -1 : 1; x = Math.abs(x) / Math.sqrt(2);
      const t = 1.0 / (1.0 + p * x);
      const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
      return 0.5 * (1.0 + sign * y);
    };
    const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
    if (type === 'call') return S * N(d1) - K * Math.exp(-r * T) * N(d2);
    else return K * Math.exp(-r * T) * N(-d2) - S * N(-d1);
  }

  calculateGreeks(S, K, T, r, sigma, type) {
    const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
    const N = (x) => {
      const t = 1 / (1 + 0.2316419 * Math.abs(x));
      const d = 0.3989423 * Math.exp(-x * x / 2);
      const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return x > 0 ? 1 - p : p;
    };
    const phi = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
    const delta = type === 'call' ? N(d1) : N(d1) - 1;
    const gamma = phi(d1) / (S * sigma * Math.sqrt(T));
    const theta = -(S * phi(d1) * sigma) / (2 * Math.sqrt(T));
    const vega = S * phi(d1) * Math.sqrt(T);
    return { delta, gamma, theta, vega };
  }
}

module.exports = new OptionsService();
