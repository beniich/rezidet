const { ethers } = require('ethers');
const prisma = require('../config/database');

class P2PExchangeService {
  
  async createOrder({ makerAddress, type, tokenAddress, tokenSymbol, amount, pricePerToken, paymentMethod, paymentDetails }) {
    return prisma.p2POrder.create({
      data: {
        makerAddress, type, tokenAddress, tokenSymbol, amount, remainingAmount: amount, pricePerToken,
        totalPrice: amount * pricePerToken, paymentMethod, paymentDetails,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });
  }

  async takeOrder({ orderId, takerAddress, amount }) {
    const order = await prisma.p2POrder.findUnique({ where: { id: orderId } });
    if (order.status !== 'OPEN' && order.status !== 'PARTIAL') throw new Error('Ordre indisponible');
    if (amount > order.remainingAmount) throw new Error('Montant trop élevé');

    const trade = await prisma.p2PTrade.create({
      data: {
        orderId, buyerAddress: order.type === 'SELL' ? takerAddress : order.makerAddress,
        sellerAddress: order.type === 'SELL' ? order.makerAddress : takerAddress,
        tokenAmount: amount, totalPrice: amount * order.pricePerToken, status: 'PENDING'
      }
    });

    const newRemaining = order.remainingAmount - amount;
    await prisma.p2POrder.update({
      where: { id: orderId },
      data: { remainingAmount: newRemaining, status: newRemaining <= 0 ? 'FILLED' : 'PARTIAL' }
    });

    return trade;
  }

  async getOpenOrders(tokenAddress) {
    const where = { status: { in: ['OPEN', 'PARTIAL'] } };
    if (tokenAddress) where.tokenAddress = tokenAddress;
    return prisma.p2POrder.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async getUserTrades(userAddress) {
    return prisma.p2PTrade.findMany({
      where: { OR: [{ buyerAddress: userAddress }, { sellerAddress: userAddress }] },
      include: { order: true }, orderBy: { createdAt: 'desc' }
    });
  }
}

module.exports = new P2PExchangeService();
