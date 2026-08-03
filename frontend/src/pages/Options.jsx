import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Options() {
  const [options, setOptions] = useState([]);
  const [tab, setTab] = useState('all');
  const [greeks, setGreeks] = useState(null);

  useEffect(() => {
    // Mock data
    setOptions([
      { id: '1', optionType: 'CALL', underlying: 'ETH', strikePrice: 3500, premium: 120.5, expiration: new Date(Date.now() + 864000000) },
      { id: '2', optionType: 'PUT', underlying: 'BTC', strikePrice: 60000, premium: 1500, expiration: new Date(Date.now() + 1728000000) },
    ]);
    setGreeks({ delta: 0.6521, gamma: 0.0012, theta: -1.452, vega: 2.14, rho: 0.0065 });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-purple-500" />
          <div>
            <h1 className="text-2xl font-bold">Options Trading</h1>
            <p className="text-[var(--color-muted)]">Calls & Puts européens, pricing Black-Scholes</p>
          </div>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-bold transition shadow-sm">
          Nouvelle option
        </button>
      </div>

      {greeks && (
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 mb-8 shadow-sm">
          <h2 className="font-bold mb-4">Calculateur de Greeks (ETH/USD)</h2>
          <div className="grid grid-cols-5 gap-4">
            <GreekCard label="Delta" value={greeks.delta.toFixed(4)} color="blue" />
            <GreekCard label="Gamma" value={greeks.gamma.toFixed(4)} color="green" />
            <GreekCard label="Theta" value={greeks.theta.toFixed(4)} color="orange" />
            <GreekCard label="Vega" value={greeks.vega.toFixed(4)} color="purple" />
            <GreekCard label="Rho" value={greeks.rho.toFixed(4)} color="red" />
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        {['all', 'CALL', 'PUT'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-bold rounded-lg transition ${tab === t ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' : 'text-[var(--color-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-foreground)]'}`}>
            {t === 'all' ? 'Toutes' : t}
          </button>
        ))}
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-[var(--color-bg)] text-[var(--color-muted)] border-b border-[var(--color-border)]">
            <tr>
              <th className="px-6 py-4 font-bold">Type</th>
              <th className="px-6 py-4 font-bold">Sous-jacent</th>
              <th className="px-6 py-4 font-bold text-right">Strike</th>
              <th className="px-6 py-4 font-bold text-right">Premium</th>
              <th className="px-6 py-4 font-bold text-right">Expiration</th>
              <th className="px-6 py-4 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {options.filter(o => tab === 'all' || o.optionType === tab).map(opt => (
              <tr key={opt.id} className="hover:bg-[var(--color-bg)] transition">
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${opt.optionType === 'CALL' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {opt.optionType}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold">{opt.underlying}</td>
                <td className="px-6 py-4 text-right font-medium">${opt.strikePrice.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-bold text-purple-500">${opt.premium.toFixed(2)}</td>
                <td className="px-6 py-4 text-right text-[var(--color-muted)] font-mono text-xs">{new Date(opt.expiration).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => toast.success('Option achetée !')} className="px-4 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] hover:bg-purple-600 hover:text-white hover:border-purple-600 rounded-lg font-bold transition text-[var(--color-foreground)]">
                    Acheter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const GreekCard = ({ label, value, color }) => (
  <div className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
    <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">{label}</p>
    <p className="text-2xl font-bold font-mono">{value}</p>
  </div>
);
