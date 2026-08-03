import { useEffect, useState } from 'react';
import { CreditCard, Download, ExternalLink, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import PlanSwitcher from '../components/PlanSwitcher';

const PLANS = {
  FREE: { label: 'Free', price: 0, color: 'text-slate-500' },
  PRO: { label: 'Pro', price: 49, color: 'text-orange-500' },
  ENTERPRISE: { label: 'Enterprise', price: 199, color: 'text-purple-600' }
};

export default function BillingSettings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/billing/info').then(({ data }) => {
      setData(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleManageSubscription = async () => {
    try {
      const { data } = await api.post('/billing/portal');
      window.location.href = data.url;
    } catch {
      toast.error('Aucun abonnement Stripe actif');
    }
  };

  const handleUpgrade = async (plan) => {
    try {
      const { data } = await api.post('/billing/checkout', { plan });
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur');
    }
  };

  if (loading) return (
    <div className="p-8 flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const currentPlan = data?.subscription?.plan || 'FREE';

  const usagePercent = (val) => {
    if (!val) return 0;
    const { used, limit } = val;
    return limit === -1 ? 0 : Math.min((used / limit) * 100, 100);
  };

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Facturation & Abonnement</h1>
        <p className="text-[var(--color-muted)]">Gérez votre plan et votre consommation</p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(PLANS).map(([key, plan]) => {
          const isActive = currentPlan === key;
          return (
            <div key={key} className={`rounded-xl p-5 border-2 transition ${isActive ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-[var(--color-border)] bg-[var(--color-surface)]'}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-bold text-lg ${plan.color}`}>{plan.label}</h3>
                {isActive && <CheckCircle className="w-5 h-5 text-orange-500" />}
              </div>
              <p className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
                {plan.price === 0 ? 'Gratuit' : `${plan.price}€/mois`}
              </p>
              {!isActive && key !== 'FREE' && (
                <button
                  onClick={() => handleUpgrade(key)}
                  className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium transition"
                >
                  Passer à {plan.label}
                </button>
              )}
              {isActive && (
                <button
                  onClick={handleManageSubscription}
                  className="w-full py-2 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-muted)] hover:bg-[var(--color-bg)] transition flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3 h-3" /> Gérer sur Stripe
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Usage */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          Consommation ce mois
        </h2>
        
        {data?.usage && Object.entries(data.usage).map(([key, val]) => {
          const percent = usagePercent(val);
          const labels = {
            api_calls: 'Appels API',
            storage_mb: 'Stockage (MB)',
            ai_requests: 'Requêtes IA'
          };

          return (
            <div key={key} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--color-muted)]">{labels[key] || key}</span>
                <span className="font-medium text-[var(--color-foreground)]">
                  {Math.round(val.used).toLocaleString()} / {val.limit === -1 ? '∞' : (val.limit || 0).toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-[var(--color-bg)] rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    percent > 80 ? 'bg-red-500' : percent > 50 ? 'bg-orange-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              {percent > 80 && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Vous approchez de la limite
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Factures */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-semibold text-[var(--color-foreground)] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-500" />
            Historique des factures
          </h2>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {!data?.invoices || data.invoices.length === 0 ? (
            <p className="p-8 text-center text-[var(--color-muted)]">Aucune facture pour le moment</p>
          ) : (
            data.invoices.map(invoice => (
              <div key={invoice.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--color-foreground)]">{invoice.number}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {new Date(invoice.createdAt).toLocaleDateString('fr-FR')} · {invoice.amount.toLocaleString('fr-FR', { style: 'currency', currency: invoice.currency?.toUpperCase() || 'EUR' })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {invoice.status}
                  </span>
                  {invoice.pdfUrl && (
                    <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition">
                      <Download className="w-4 h-4 text-[var(--color-muted)]" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
