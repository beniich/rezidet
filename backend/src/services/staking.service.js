const { ethers } = require('ethers');
const prisma = require('../config/database');

const TOKEN_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function stake(uint256 amount) external",
  "function unstake(uint256 amount) external",
  "function claimRewards() external",
  "function stakedBalance(address account) external view returns (uint256)",
  "function calculateRewards(address account) external view returns (uint256)",
  "function totalStaked() external view returns (uint256)"
];

class StakingService {
  constructor() {
    this.provider = process.env.POLYGON_RPC ? new ethers.JsonRpcProvider(process.env.POLYGON_RPC) : null;
    if (this.provider && process.env.CAFM_TOKEN_ADDRESS) {
      this.tokenContract = new ethers.Contract(process.env.CAFM_TOKEN_ADDRESS, TOKEN_ABI, this.provider);
      if (process.env.OPERATOR_PRIVATE_KEY) {
        this.operatorWallet = new ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY, this.provider);
        this.tokenWithSigner = this.tokenContract.connect(this.operatorWallet);
      }
    }
  }

  async getGlobalStats() {
    try {
      if (!this.tokenContract) throw new Error('Contract not initialized');
      const totalStaked = await this.tokenContract.totalStaked();
      return {
        totalStaked: ethers.formatEther(totalStaked), currentAPY: 5.0,
        totalStakers: await prisma.stakingPosition.count({ where: { active: true } })
      };
    } catch {
      return { totalStaked: '100000', currentAPY: 5.0, totalStakers: await prisma.stakingPosition.count({ where: { active: true } }) };
    }
  }

  async getUserPosition(userAddress) {
    try {
      if (!this.tokenContract) throw new Error('Contract not initialized');
      const [staked, rewards, history] = await Promise.all([
        this.tokenContract.stakedBalance(userAddress),
        this.tokenContract.calculateRewards(userAddress),
        prisma.stakingEvent.findMany({ where: { userAddress }, orderBy: { createdAt: 'desc' }, take: 20 })
      ]);
      return {
        stakedAmount: ethers.formatEther(staked), pendingRewards: ethers.formatEther(rewards),
        history: history.map(h => ({ type: h.type, amount: h.amount, txHash: h.txHash, timestamp: h.createdAt }))
      };
    } catch {
      const pos = await prisma.stakingPosition.findUnique({ where: { userAddress } });
      const history = await prisma.stakingEvent.findMany({ where: { userAddress }, orderBy: { createdAt: 'desc' }, take: 20 });
      return {
        stakedAmount: pos?.amount || 0, pendingRewards: 0,
        history: history.map(h => ({ type: h.type, amount: h.amount, txHash: h.txHash, timestamp: h.createdAt }))
      };
    }
  }

  async relayStake({ userAddress, amount }) {
    await prisma.stakingPosition.upsert({
      where: { userAddress },
      update: { amount: { increment: parseFloat(amount) } },
      create: { userAddress, amount: parseFloat(amount) }
    });
    await prisma.stakingEvent.create({ data: { userAddress, type: 'STAKE', amount: parseFloat(amount) } });
    return { success: true };
  }
}

module.exports = new StakingService();
