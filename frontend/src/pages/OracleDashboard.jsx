import { useEffect, useState } from 'react';
import { Activity, Bell } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import api from '../services/api';

export default function OracleDashboard() {
  const [prices, setPrices] = useState([]);
  const [history, setHistory] = useState({});

  useEffect(() => {
    // Mocked data for demo
    setPrices([
      { pair: 'ETH/USD', price: 3450.2, chainId: 1, ageSeconds: 12, isStale: false },
      { pair: 'BTC/USD', price: 65120.5, chainId: 1, ageSeconds: 4, isStale: false },
      { pair: 'MATIC/USD', price: 0.85, chainId: 137, ageSeconds: 45, isStale: false }
    ]);

    const ethHistory = Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`, price: 3400 + Math.random() * 100
    }));
    setHistory({ 'ETH/USD': ethHistory });
  }, []);

  const handleSetupAlert = (pair) => {
    const threshold = prompt(`Alerter quand ${pair} dépasse :`);
    if (threshold) {
      alert(`Alerte créée pour ${pair} au seuil de ${threshold}`);
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold">Oracle Chainlink</h1>
          <p className="text-[var(--color-muted)]">Prix temps réel via Chainlink Price Feeds</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {prices.map(p => (
          <div key={p.pair} className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-[var(--color-muted)]">{p.pair}</p>
                <p className="text-2xl font-bold mt-1 text-[var(--color-foreground)]">
                  ${p.price.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </p>
              </div>
              <button onClick={() => handleSetupAlert(p.pair)} className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition border border-transparent hover:border-[var(--color-border)]">
                <Bell className="w-4 h-4 text-[var(--color-muted)]" />
              </button>
            </div>
            <p className="text-xs text-[var(--color-muted)]">
              Chain {p.chainId} • {p.ageSeconds}s ago
              {p.isStale && <span className="text-orange-500 ml-1">⚠️ Stale</span>}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="font-bold mb-4">ETH/USD - 24h</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history['ETH/USD'] || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" fontSize={11} stroke="var(--color-muted)" />
            <YAxis fontSize={11} domain={['auto', 'auto']} stroke="var(--color-muted)" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }} />
            <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
