const { ethers } = require('ethers');
const prisma = require('../config/database');

const BRIDGE_ABI = [
  'function deposit(uint256 destinationChainId, address recipient, uint256 amount, uint256 tokenId) external payable',
  'function withdraw(uint256 sourceChainId, address recipient, uint256 amount, uint256 nonce, bytes calldata signature) external',
  'function getFee(uint256 destinationChainId, uint256 amount) external view returns (uint256)',
  'event BridgeDeposit(uint256 indexed nonce, address indexed sender, uint256 destinationChain, address recipient, uint256 amount, uint256 tokenId)',
  'event BridgeWithdrawal(uint256 indexed nonce, address indexed recipient, uint256 amount, uint256 sourceChain)'
];

class CrossChainBridgeService {
  constructor() {
    this.chains = {
      1: { name: 'Ethereum', rpc: process.env.ETHEREUM_RPC, bridgeAddress: process.env.BRIDGE_ETH_ADDRESS, usdcAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', explorer: 'https://etherscan.io' },
      137: { name: 'Polygon', rpc: process.env.POLYGON_RPC, bridgeAddress: process.env.BRIDGE_POLYGON_ADDRESS, usdcAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', explorer: 'https://polygonscan.com' },
      8453: { name: 'Base', rpc: process.env.BASE_RPC, bridgeAddress: process.env.BRIDGE_BASE_ADDRESS, usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', explorer: 'https://basescan.org' }
    };

    this.providers = {};
    this.bridgeContracts = {};
    
    for (const [chainId, config] of Object.entries(this.chains)) {
      if (!config.rpc) continue;
      this.providers[chainId] = new ethers.JsonRpcProvider(config.rpc);
      if (config.bridgeAddress) {
        this.bridgeContracts[chainId] = new ethers.Contract(config.bridgeAddress, BRIDGE_ABI, this.providers[chainId]);
      }
    }
  }

  async bridgeDeposit({ fromChainId, toChainId, senderAddress, recipientAddress, amount, token = 'USDC' }) {
    const fromChain = this.chains[fromChainId];
    const toChain = this.chains[toChainId];
    if (!fromChain || !toChain) throw new Error('Chain non supportée');

    const tokenAddress = fromChain.usdcAddress;
    const amountWei = ethers.parseUnits(amount.toString(), 6);
    let fee = 0n;
    if (this.bridgeContracts[fromChainId]) {
      try { fee = await this.bridgeContracts[fromChainId].getFee(toChainId, amountWei); } catch(e) {}
    } else {
      fee = amountWei * 10n / 10000n; // 0.1% mockup
    }
    
    const nonce = Math.floor(Math.random() * 1000000);
    const txData = { chainId: fromChainId, bridgeAddress: fromChain.bridgeAddress, tokenAddress, amount: amountWei.toString(), fee: fee.toString(), destinationChainId: toChainId, recipient: recipientAddress, nonce };

    const transfer = await prisma.bridgeTransfer.create({
      data: {
        nonce, fromChainId, toChainId, senderAddress, recipientAddress, amount, token, status: 'PENDING',
        estimatedArrival: new Date(Date.now() + 5 * 60 * 1000)
      }
    });

    return { transfer, txData };
  }

  async getUserBridges(userAddress) {
    return prisma.bridgeTransfer.findMany({
      where: { OR: [{ senderAddress: userAddress }, { recipientAddress: userAddress }] },
      orderBy: { createdAt: 'desc' }
    });
  }
}

module.exports = new CrossChainBridgeService();
