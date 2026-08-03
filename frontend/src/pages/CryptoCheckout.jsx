import { useState, useEffect } from 'react';
import { Bitcoin, Loader2, Clock, Copy } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function CryptoCheckout() {
  const [amount, setAmount] = useState(100);
  const [crypto, setCrypto] = useState('BTC');
  const [charge, setCharge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [rates, setRates] = useState({});

  useEffect(() => {
    // Mock rates if api fails
    setRates({ BTC: '0.000015', ETH: '0.00035', USDC: '1.09', DAI: '1.09' });
  }, []);

  useEffect(() => {
    if (!charge?.expiresAt) return;
    const interval = setInterval(() => {
      const remaining = new Date(charge.expiresAt) - Date.now();
      setTimeLeft(Math.max(0, Math.floor(remaining / 1000)));
      if (remaining <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [charge]);

  const createCharge = async () => {
    setLoading(true);
    try {
      // Stub
      toast.success('Paiement initié via Coinbase Commerce');
      setCharge({
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        addresses: { BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
        hostedUrl: 'https://commerce.coinbase.com/checkout/123'
      });
    } catch (err) {
      toast.error('Erreur création paiement');
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = (addr) => {
    navigator.clipboard.writeText(addr);
    toast.success('Adresse copiée');
  };

  if (charge) {
    const address = charge.addresses[crypto] || charge.addresses.BTC;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-900/20 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-[var(--color-surface)] rounded-2xl shadow-xl border border-[var(--color-border)] p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-[var(--color-foreground)]">Paiement en {crypto}</h1>

          {timeLeft > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-6 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-500" />
              <span className="font-medium text-orange-700 dark:text-orange-400">
                Expire dans {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-[var(--color-muted)]">
              Envoyez exactement <strong>{(amount * parseFloat(rates[crypto])).toFixed(6)} {crypto}</strong> à cette adresse :
            </label>
            <div className="flex gap-2">
              <input value={address} readOnly className="flex-1 px-3 py-2 border border-[var(--color-border)] bg-[var(--color-bg)] rounded-lg font-mono text-xs text-[var(--color-foreground)]" />
              <button onClick={() => copyAddress(address)} className="px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg hover:border-orange-500 transition">
                <Copy className="w-4 h-4 text-[var(--color-foreground)]" />
              </button>
            </div>
          </div>

          <div className="text-center mb-6 bg-white p-2 rounded-xl inline-block mx-auto w-full">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`} alt="QR Code" className="mx-auto" />
          </div>

          <a href={charge.hostedUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg)] transition font-medium text-[var(--color-foreground)] mb-2">
            Ouvrir sur Coinbase →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-900/20 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-[var(--color-surface)] rounded-2xl shadow-xl border border-[var(--color-border)] p-8">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bitcoin className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2 text-[var(--color-foreground)]">Payer en crypto</h1>
        <p className="text-center text-[var(--color-muted)] mb-8 text-sm">Rechargez vos crédits avec Bitcoin, Ethereum ou USDC</p>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-[var(--color-muted)]">Montant (EUR)</label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[50, 100, 250, 500].map(v => (
              <button key={v} onClick={() => setAmount(v)} className={`py-2 rounded-xl font-medium transition ${amount === v ? 'bg-orange-500 text-white' : 'bg-[var(--color-bg)] text-[var(--color-foreground)] border border-[var(--color-border)]'}`}>
                {v}€
              </button>
            ))}
          </div>
          <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xl font-bold text-center text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-[var(--color-muted)]">Cryptomonnaie</label>
          <div className="grid grid-cols-2 gap-3">
            {['BTC', 'ETH', 'USDC', 'DAI'].map(c => (
              <button key={c} onClick={() => setCrypto(c)} className={`p-4 rounded-xl border-2 transition text-left ${crypto === c ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-[var(--color-border)] bg-[var(--color-bg)]'}`}>
                <div className="font-bold text-[var(--color-foreground)]">{c}</div>
                {rates[c] && <div className="text-xs text-[var(--color-muted)] mt-1">≈ {(amount * parseFloat(rates[c])).toFixed(c === 'USDC' || c === 'DAI' ? 2 : 5)}</div>}
              </button>
            ))}
          </div>
        </div>

        <button onClick={createCharge} disabled={loading || amount < 10} className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Continuer avec ${crypto}`}
        </button>
      </div>
    </div>
  );
}
