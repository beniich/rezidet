import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, AlertCircle, Check, Loader2 } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const PLANS = [
  { id: 'FREE', name: 'Free', monthlyEur: 0 },
  { id: 'PRO', name: 'Pro', monthlyEur: 49 },
  { id: 'ENTERPRISE', name: 'Enterprise', monthlyEur: 199 }
];

const PLAN_ORDER = { FREE: 0, PRO: 1, ENTERPRISE: 2 };

export default function PlanSwitcher({ currentPlan = 'FREE', onSuccess }) {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleChange = async (newPlan) => {
    if (newPlan === currentPlan) return;
    const isUpgrade = PLAN_ORDER[newPlan] > PLAN_ORDER[currentPlan];

    setLoading(newPlan);
    try {
      // Preview charge
      if (isUpgrade) {
        try {
          const { data: p } = await api.post('/billing/preview', { newPlan, billingPeriod });
          setPreview({ ...p, newPlan });
          setLoading(null);
          return; // Wait for user confirmation from preview
        } catch {
          // No stripe subscription yet, redirect to checkout
          const { data } = await api.post('/billing/checkout', { plan: newPlan, billingPeriod });
          window.location.href = data.url;
          return;
        }
      } else {
        const { data } = await api.post('/billing/downgrade', { newPlan, billingPeriod });
        toast.success(data.message);
        onSuccess?.();
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur');
    } finally {
      setLoading(null);
    }
  };

  const confirmUpgrade = async () => {
    if (!preview) return;
    setLoading(preview.newPlan);
    try {
      const { data } = await api.post('/billing/upgrade', {
        newPlan: preview.newPlan,
        billingPeriod
      });
      toast.success(`✅ ${data.message}`);
      setPreview(null);
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur lors de l\'upgrade');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6">
      <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-4">Changer de plan</h2>

      {/* Billing period toggle */}
      <div className="flex gap-2 mb-5 p-1 bg-[var(--color-bg)] rounded-xl">
        {[
          { id: 'monthly', label: 'Mensuel' },
          { id: 'yearly', label: 'Annuel −20%' }
        ].map(p => (
          <button
            key={p.id}
            onClick={() => setBillingPeriod(p.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              billingPeriod === p.id
                ? 'bg-orange-500 text-white shadow'
                : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {PLANS.map(plan => {
          const isCurrent = plan.id === currentPlan;
          const isUpgrade = PLAN_ORDER[plan.id] > PLAN_ORDER[currentPlan];
          const isDowngrade = PLAN_ORDER[plan.id] < PLAN_ORDER[currentPlan];
          const displayPrice = billingPeriod === 'yearly'
            ? Math.round(plan.monthlyEur * 0.8)
            : plan.monthlyEur;

          return (
            <div
              key={plan.id}
              className={`border-2 rounded-xl p-4 transition ${
                isCurrent
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
                  : 'border-[var(--color-border)]'
              }`}
            >
              {isCurrent && (
                <div className="flex items-center gap-1 text-xs text-orange-500 font-bold mb-1">
                  <Check className="w-3 h-3" /> Actuel
                </div>
              )}
              <p className="font-bold text-[var(--color-foreground)]">{plan.name}</p>
              <p className="text-xl font-bold text-[var(--color-foreground)] my-1">
                {displayPrice === 0 ? 'Gratuit' : `${displayPrice}€`}
                {displayPrice > 0 && <span className="text-xs font-normal text-[var(--color-muted)]">/mois</span>}
              </p>

              {!isCurrent && (
                <button
                  onClick={() => handleChange(plan.id)}
                  disabled={loading !== null}
                  className={`w-full mt-2 py-1.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition ${
                    isUpgrade
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-orange-400'
                  } disabled:opacity-50`}
                >
                  {loading === plan.id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : isUpgrade ? (
                    <><ArrowUp className="w-3 h-3" /> Upgrader</>
                  ) : (
                    <><ArrowDown className="w-3 h-3" /> Downgrader</>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Preview confirmation panel */}
      {preview && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Confirmer l'upgrade vers {preview.newPlan} ?
          </p>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 mb-3">
            <li>• Charge immédiate (prorata) : <strong>{preview.immediateCharge?.toFixed(2)}€</strong></li>
            <li>• Prochaine facture : <strong>{preview.nextInvoiceAmount?.toFixed(2)}€</strong></li>
          </ul>
          <div className="flex gap-2">
            <button
              onClick={confirmUpgrade}
              disabled={loading !== null}
              className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50"
            >
              Confirmer l'upgrade
            </button>
            <button
              onClick={() => setPreview(null)}
              className="px-4 py-2 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-muted)]"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
