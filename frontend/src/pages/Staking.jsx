import { useEffect, useState } from 'react';
import { Coins, TrendingUp, Award, Wallet, Zap, ExternalLink, Users } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Staking() {
  const [stats, setStats] = useState(null);
  const [position, setPosition] = useState(null);
  const [amount, setAmount] = useState('');
  const [lockDays, setLockDays] = useState(90);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Mocked data if api endpoints are not fully wired in frontend
      setStats({ totalStaked: '2500000', currentAPY: 5.5, totalStakers: 1240 });
      setPosition({ stakedAmount: '10000', pendingRewards: '150' });
      setHistory([{ type: 'STAKE', amount: '10000', txHash: '0x123', timestamp: new Date() }]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    setTimeout(() => {
      toast.success('✅ Staking initié !');
      setAmount('');
      setLoading(false);
      loadData();
    }, 1500);
  };

  if (!stats) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center gap-3 mb-6">
        <Coins className="w-8 h-8 text-yellow-500" />
        <div>
          <h1 className="text-2xl font-bold">Staking REZIDET Token</h1>
          <p className="text-slate-500">Gagnez jusqu'à 5% APY en stakant vos tokens</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard icon={Wallet} label="Total staké" value={`${stats.totalStaked} REZIDET`} color="yellow" />
        <KPICard icon={TrendingUp} label="APY actuel" value={`${stats.currentAPY}%`} color="green" />
        <KPICard icon={Award} label="Boost NFT" value="+0.5%" color="purple" />
        <KPICard icon={Users} label="Stakers" value={stats.totalStakers} color="blue" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-bold mb-4">Stake</h2>
          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">Montant (REZIDET)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="1000" className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-bg)] rounded-lg text-lg" />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Lock period (jours)</label>
            <div className="grid grid-cols-4 gap-2">
              {[30, 90, 180, 365].map(d => (
                <button key={d} onClick={() => setLockDays(d)} className={`p-2 border-2 rounded-lg text-sm ${lockDays === d ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10' : 'border-[var(--color-border)]'}`}>
                  {d}j
                  <div className="text-xs text-slate-500">+{(d/30 * 0.1).toFixed(1)}% bonus</div>
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleStake} disabled={loading || !amount} className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 disabled:opacity-50">
            {loading ? 'Confirmation...' : 'Staker'}
          </button>
          {position && parseFloat(position.stakedAmount) > 0 && (
            <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
              <h3 className="font-medium mb-2">Ma position</h3>
              <p className="text-2xl font-bold">{position.stakedAmount} REZIDET</p>
              <p className="text-sm text-green-600">+{position.pendingRewards} rewards en attente</p>
              <button className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Réclamer les rewards</button>
            </div>
          )}
        </div>
        <div className="lg:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
          <h2 className="p-6 font-bold border-b border-[var(--color-border)]">Historique des rewards</h2>
          <div className="divide-y divide-[var(--color-border)] max-h-96 overflow-y-auto">
            {history.map((h, i) => (
              <div key={i} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">{h.type}</p>
                    <p className="text-xs text-slate-500">{new Date(h.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{h.amount} REZIDET</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const KPICard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)]">
    <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400 mb-3`} />
    <p className="text-2xl font-bold text-[var(--color-foreground)]">{value}</p>
    <p className="text-sm text-[var(--color-muted)]">{label}</p>
  </div>
);
