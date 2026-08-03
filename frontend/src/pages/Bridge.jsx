import { useState, useEffect } from 'react';
import { ArrowRight, Loader2, ExternalLink, Zap, Clock } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const CHAINS = [
  { id: 1, name: 'Ethereum', symbol: 'ETH', color: 'blue' },
  { id: 137, name: 'Polygon', symbol: 'MATIC', color: 'purple' },
  { id: 8453, name: 'Base', symbol: 'ETH', color: 'blue' }
];

export default function Bridge() {
  const [fromChain, setFromChain] = useState(137);
  const [toChain, setToChain] = useState(1);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [quote, setQuote] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      setQuote({ fee: (parseFloat(amount) * 0.001).toFixed(2), receive: (parseFloat(amount) * 0.999).toFixed(2), eta: '~5 min' });
    } else {
      setQuote(null);
    }
  }, [amount, fromChain, toChain]);

  useEffect(() => {
    setHistory([
      { id: '1', fromChainId: 137, toChainId: 1, amount: 500, status: 'COMPLETED', createdAt: new Date(Date.now() - 3600000), txHash: '0xabc' },
      { id: '2', fromChainId: 1, toChainId: 8453, amount: 200, status: 'PENDING', createdAt: new Date(), txHash: null }
    ]);
  }, []);

  const handleBridge = async () => {
    if (!amount || !recipient) { toast.error('Remplissez tous les champs'); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success(`Bridge initié ! Frais: ${quote?.fee} USDC`);
      setLoading(false);
      setAmount('');
    }, 1500);
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold">Cross-Chain Bridge</h1>
          <p className="text-[var(--color-muted)]">Transférez vos tokens entre Ethereum, Polygon et Base</p>
        </div>
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 mb-6">
        <div className="grid grid-cols-5 gap-3 items-center">
          <div className="col-span-2">
            <label className="text-sm font-medium mb-2 block text-[var(--color-muted)]">De</label>
            <select value={fromChain} onChange={e => setFromChain(+e.target.value)} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-foreground)] rounded-lg">
              {CHAINS.map(c => <option key={c.id} value={c.id}>{c.name} ({c.symbol})</option>)}
            </select>
          </div>
          <button onClick={() => { const tmp = fromChain; setFromChain(toChain); setToChain(tmp); }} className="self-end mb-0 p-3 hover:bg-[var(--color-bg)] border border-transparent hover:border-[var(--color-border)] transition rounded-lg text-[var(--color-foreground)]">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="col-span-2">
            <label className="text-sm font-medium mb-2 block text-[var(--color-muted)]">Vers</label>
            <select value={toChain} onChange={e => setToChain(+e.target.value)} className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-foreground)] rounded-lg">
              {CHAINS.filter(c => c.id !== fromChain).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium mb-2 block text-[var(--color-muted)]">Montant USDC</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="1000" className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-foreground)] rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium mb-2 block text-[var(--color-muted)]">Adresse destinataire</label>
          <input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="0x..." className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-foreground)] rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        {quote && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg space-y-2 text-sm border border-blue-100 dark:border-blue-900/30">
            <div className="flex justify-between"><span>Vous envoyez:</span><span className="font-medium text-[var(--color-foreground)]">{amount} USDC</span></div>
            <div className="flex justify-between text-[var(--color-muted)]"><span>Frais bridge (0.1%):</span><span>{quote.fee} USDC</span></div>
            <div className="flex justify-between border-t border-blue-200 dark:border-blue-800/50 pt-2 mt-2">
              <span>Vous recevez:</span><span className="font-bold text-blue-600 dark:text-blue-400">{quote.receive} USDC</span>
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-2 flex items-center gap-1"><Clock className="w-3 h-3" /> Arrivée estimée : {quote.eta}</p>
          </div>
        )}

        <button onClick={handleBridge} disabled={loading || !quote} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 transition">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Zap className="w-4 h-4" /> Initier le bridge</>}
        </button>
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
        <h2 className="p-6 font-bold border-b border-[var(--color-border)]">Historique des bridges</h2>
        <div className="divide-y divide-[var(--color-border)]">
          {history.map(h => (
            <div key={h.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--color-foreground)]">{CHAINS.find(c => c.id === h.fromChainId)?.name} → {CHAINS.find(c => c.id === h.toChainId)?.name}</p>
                <p className="text-xs text-[var(--color-muted)]">{h.amount} USDC • {h.createdAt.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${h.status === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                  {h.status}
                </span>
                {h.txHash && <a href="#" target="_blank" className="text-blue-600 dark:text-blue-400 hover:opacity-80"><ExternalLink className="w-4 h-4" /></a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
