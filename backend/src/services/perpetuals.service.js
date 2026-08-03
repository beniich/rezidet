// Mock service for Perpetuals to serve the UI
class PerpetualsService {
  async getMarkets() {
    return [
      { id: '1', symbol: 'ETH', markPrice: 3450.2, change24h: 2.5, fundingRate: 10, maxLeverage: 100 },
      { id: '2', symbol: 'BTC', markPrice: 65120.5, change24h: -1.2, fundingRate: 15, maxLeverage: 100 },
      { id: '3', symbol: 'SOL', markPrice: 145.8, change24h: 5.4, fundingRate: 8, maxLeverage: 50 },
    ];
  }

  async getPositions(userAddress) {
    return [
      { id: 'pos1', marketId: '1', marketSymbol: 'ETH', isLong: true, size: 5000, collateral: 500, leverage: 10, entryPrice: 3400, liquidationPrice: 3060, unrealizedPnl: 250 }
    ];
  }

  async openPosition({ userAddress, marketId, side, collateral, leverage }) {
    return { success: true, positionId: 'new_pos' };
  }

  async closePosition(positionId) {
    return { success: true };
  }
}

module.exports = new PerpetualsService();
