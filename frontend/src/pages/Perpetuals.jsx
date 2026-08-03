import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, Zap, AlertTriangle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Perpetuals() {
  const [markets, setMarkets] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [leverage, setLeverage] = useState(10);
  const [side, setSide] = useState('long');
  const [collateral, setCollateral] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    // Mock data for demo
    const mockMarkets = [
      { id: '1', symbol: 'ETH', markPrice: 3450.2, change24h: 2.5, fundingRate: 10, maxLeverage: 100 },
      { id: '2', symbol: 'BTC', markPrice: 65120.5, change24h: -1.2, fundingRate: 15, maxLeverage: 100 },
    ];
    setMarkets(mockMarkets);
    setSelectedMarket(mockMarkets[0]);
    
    setPositions([
      { id: 'pos1', marketId: '1', marketSymbol: 'ETH', isLong: true, size: 5000, collateral: 500, leverage: 10, entryPrice: 3400, liquidationPrice: 3060, unrealizedPnl: 250 }
    ]);
    
    setPriceHistory(Array.from({ length: 24 }).map((_, i) => ({ time: `${i}:00`, price: 3400 + Math.random() * 100 })));
  }, []);

  const openPosition = () => {
    if (!collateral || parseFloat(collateral) < 10) return;
    toast.success(`Position ${side.toUpperCase()} ouverte avec ${leverage}x leverage !`);
    setCollateral('');
  };

  const closePosition = (id) => {
    if (window.confirm('Fermer cette position ?')) {
      setPositions(positions.filter(p => p.id !== id));
      toast.success('Position fermée');
    }
  };

  if (!selectedMarket) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-8 h-8 text-orange-500" />
        <div>
          <h1 className="text-2xl font-bold">Perpetual Trading</h1>
          <p className="text-[var(--color-muted)]">Tradez avec un leverage jusqu'à 100x</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4 h-[calc(100vh-200px)] overflow-y-auto">
          <h3 className="font-bold mb-3">Marchés</h3>
          <div className="space-y-2">
            {markets.map(m => (
              <button key={m.id} onClick={() => setSelectedMarket(m)} className={`w-full p-3 rounded-lg text-left transition ${selectedMarket.id === m.id ? 'bg-orange-500/10 border border-orange-500/30 text-orange-500' : 'hover:bg-[var(--color-bg)] text-[var(--color-foreground)] border border-transparent hover:border-[var(--color-border)]'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{m.symbol}</p>
                    <p className="text-xs text-[var(--color-muted)]">${parseFloat(m.markPrice).toLocaleString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-bold ${m.change24h > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {m.change24h > 0 ? '+' : ''}{m.change24h.toFixed(2)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedMarket.symbol}/USDC</h2>
              <div className="text-right">
                <p className="text-3xl font-bold">${parseFloat(selectedMarket.markPrice).toLocaleString()}</p>
                <p className={`text-sm ${selectedMarket.change24h > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {selectedMarket.change24h > 0 ? '+' : ''}{selectedMarket.change24h.toFixed(2)}% 24h
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" fontSize={11} stroke="var(--color-muted)" />
                <YAxis fontSize={11} domain={['auto', 'auto']} stroke="var(--color-muted)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }} />
                <Line type="monotone" dataKey="price" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6">
            <div className="flex gap-2 mb-4">
              <button onClick={() => setSide('long')} className={`flex-1 py-3 rounded-lg font-bold transition ${side === 'long' ? 'bg-green-500 text-white' : 'bg-[var(--color-bg)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]'}`}>
                <TrendingUp className="w-4 h-4 inline mr-2" /> LONG
              </button>
              <button onClick={() => setSide('short')} className={`flex-1 py-3 rounded-lg font-bold transition ${side === 'short' ? 'bg-red-500 text-white' : 'bg-[var(--color-bg)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]'}`}>
                <TrendingDown className="w-4 h-4 inline mr-2" /> SHORT
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Leverage: <span className="text-orange-500 font-bold">{leverage}x</span></label>
                <div className="flex gap-2 mb-2">
                  {[10, 25, 50, 75, 100].map(l => (
                    <button key={l} onClick={() => setLeverage(l)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${leverage === l ? 'bg-orange-500 text-white' : 'bg-[var(--color-bg)] text-[var(--color-muted)] hover:bg-[var(--color-border)]'}`}>
                      {l}x
                    </button>
                  ))}
                </div>
                <input type="range" min="10" max="100" value={leverage} onChange={e => setLeverage(+e.target.value)} className="w-full accent-orange-500" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Collateral (USDC)</label>
                <input type="number" value={collateral} onChange={e => setCollateral(e.target.value)} placeholder="100" className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-foreground)] rounded-lg text-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              {collateral && (
                <div className="bg-[var(--color-bg)] p-4 rounded-lg text-sm space-y-1 border border-[var(--color-border)]">
                  <div className="flex justify-between"><span>Position size:</span><span className="font-bold">${(parseFloat(collateral) * leverage).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Liquidation price:</span><span className="font-bold text-red-500">
                    ${side === 'long' ? (parseFloat(selectedMarket.markPrice) * (1 - 1/leverage)).toFixed(2) : (parseFloat(selectedMarket.markPrice) * (1 + 1/leverage)).toFixed(2)}
                  </span></div>
                  <div className="flex justify-between"><span>Funding rate:</span><span className="font-bold">{(selectedMarket.fundingRate / 100).toFixed(4)}%/h</span></div>
                </div>
              )}
              <button onClick={openPosition} disabled={!collateral || parseFloat(collateral) < 10} className={`w-full py-3 rounded-lg font-bold text-white transition ${side === 'long' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} disabled:opacity-50`}>
                Ouvrir position {side.toUpperCase()} {leverage}x
              </button>
            </div>
          </div>

          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
            <h3 className="p-6 font-bold border-b border-[var(--color-border)]">Mes positions ({positions.length})</h3>
            {positions.length === 0 ? (
              <p className="p-6 text-center text-[var(--color-muted)]">Aucune position ouverte</p>
            ) : (
              <div className="divide-y divide-[var(--color-border)]">
                {positions.map(p => (
                  <div key={p.id} className="p-4 flex items-center justify-between hover:bg-[var(--color-bg)] transition">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${p.isLong ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                          {p.isLong ? 'LONG' : 'SHORT'} {p.leverage}x
                        </span>
                        <span className="font-bold">{p.marketSymbol}</span>
                      </div>
                      <p className="text-xs text-[var(--color-muted)]">Size: ${p.size.toFixed(2)} • Entry: ${p.entryPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold ${p.unrealizedPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>{p.unrealizedPnl >= 0 ? '+' : ''}${p.unrealizedPnl.toFixed(2)}</p>
                        <p className={`text-xs font-medium ${p.unrealizedPnl >= 0 ? 'text-green-500/80' : 'text-red-500/80'}`}>{((p.unrealizedPnl / p.collateral) * 100).toFixed(2)}%</p>
                      </div>
                      <button onClick={() => closePosition(p.id)} className="px-4 py-2 bg-[var(--color-bg)] text-[var(--color-foreground)] border border-[var(--color-border)] rounded-lg font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition">
                        Fermer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
