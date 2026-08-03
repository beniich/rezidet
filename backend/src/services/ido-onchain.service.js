const { ethers } = require('ethers');
const prisma = require('../config/database');

const IDO_ABI = [
  'function contribute(uint256 usdcAmount) external',
  'function claim() external',
  'function finalize() external',
  'function cancel() external',
  'function getVestingInfo(address user) external view returns (uint256, uint256, uint256, uint256)'
];

class IDOOnChainService {
  constructor() {
    this.provider = process.env.POLYGON_RPC ? new ethers.JsonRpcProvider(process.env.POLYGON_RPC) : null;
    if (this.provider && process.env.ADMIN_PRIVATE_KEY) {
      this.adminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);
    }
  }

  async contribute({ projectId, investorAddress, usdcAmount, txHash }) {
    await prisma.iDOContribution.updateMany({
      where: { projectId, investorAddress, status: 'PENDING' },
      data: { txHash, status: 'CONFIRMED' }
    });
    return { success: true };
  }

  async getVestingStatus(projectId, userAddress) {
    const project = await prisma.iDOProject.findUnique({ where: { id: projectId } });
    if (!project?.tokenAddress || !this.provider) return null;

    try {
      const contract = new ethers.Contract(project.tokenAddress, IDO_ABI, this.provider);
      const [total, claimed, claimable, vestingStart] = await contract.getVestingInfo(userAddress);
      return {
        total: ethers.formatEther(total), claimed: ethers.formatEther(claimed),
        claimable: ethers.formatEther(claimable), vestingStart: Number(vestingStart) * 1000,
        progress: total > 0 ? (Number(claimed) / Number(total)) * 100 : 0
      };
    } catch { return null; }
  }

  async finalizeIDO(projectId) {
    await prisma.iDOProject.update({ where: { id: projectId }, data: { status: 'SUCCESS' } });
  }

  async cancelIDO(projectId) {
    await prisma.iDOProject.update({ where: { id: projectId }, data: { status: 'CANCELED' } });
  }
}

module.exports = new IDOOnChainService();
