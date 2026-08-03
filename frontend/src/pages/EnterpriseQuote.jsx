import { useState, useEffect } from 'react';
import { Building2, Users, Package, Shield, Database, Check, ArrowRight, Loader2, Calculator } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const FEATURES = [
  { id: 'sso', label: 'SSO / SAML', icon: Shield, price: 0, description: 'Authentification unifiée' },
  { id: 'custom_integrations', label: 'Intégrations custom', icon: Database, price: 500, description: 'ERP, CMMS sur mesure' },
  { id: 'dedicated_support', label: 'Support dédié 24/7', icon: Users, price: 300, description: 'SLA garanti 4h' },
  { id: 'onboarding', label: 'Onboarding complet', icon: Building2, price: 2000, description: 'Migration + configuration' },
  { id: 'training', label: 'Formation équipe', icon: Users, price: 1500, description: 'Sessions live + docs' },
  { id: 'custom_ai', label: 'IA personnalisée', icon: Shield, price: 1000, description: 'Modèles IA sur vos données' }
];

const STEPS = ['Votre entreprise', 'Vos besoins', 'Récapitulatif'];

export default function EnterpriseQuote() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [pricing, setPricing] = useState(null);
  const [form, setForm] = useState({
    contactName: '', contactEmail: '', contactPhone: '',
    companyName: '', companySize: '', industry: '', country: 'FR',
    userCount: 50, assetCount: 500, buildingCount: 5,
    features: [], contractMonths: 12
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const toggleFeature = (id) => setForm(prev => ({
    ...prev,
    features: prev.features.includes(id)
      ? prev.features.filter(f => f !== id)
      : [...prev.features, id]
  }));

  // Calc pricing live
  useEffect(() => {
    if (step === 2) {
      api.post('/enterprise/quote/calculate', form)
        .then(({ data }) => setPricing(data))
        .catch(() => {
          // Fallback local calculation
          const u = form.userCount;
          const base = 199;
          const perUser = u > 25 ? (u - 25) * 5 : 0;
          let total = base + perUser;
          let discount = 0;
          if (u >= 100) discount = 10;
          if (u >= 250) discount = 15;
          if (u >= 500) discount = 20;
          if (form.contractMonths >= 24) discount += 5;
          if (discount) total = total * (1 - discount / 100);
          setPricing({ monthlyBase: base, perUserPrice: perUser, totalMonthly: total, totalYearly: total * 12, discountPercent: discount, setupFee: form.contractMonths >= 12 ? 0 : 1500 });
        });
    }
  }, [step]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/enterprise/quote/request', form);
      setReference(data.reference);
      setSubmitted(true);
      toast.success('Devis soumis ! Réponse sous 24h.');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur lors de la soumission');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Demande envoyée !</h1>
          <p className="text-[var(--color-muted)] mb-4">
            Référence : <strong className="text-orange-500">{reference}</strong>
          </p>
          <p className="text-[var(--color-muted)] text-sm">
            Notre équipe commerciale vous contactera à <strong>{form.contactEmail}</strong> dans les 24h ouvrables avec une proposition personnalisée.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Plan Enterprise</h1>
          <p className="text-[var(--color-muted)] mt-2">Configuration sur mesure avec tarification calculée en temps réel</p>
        </div>

        {/* Steps */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                step > i ? 'bg-green-500 text-white' : step === i ? 'bg-orange-500 text-white' : 'bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-muted)]'
              }`}>
                {step > i ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${step >= i ? 'text-[var(--color-foreground)]' : 'text-[var(--color-muted)]'}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${step > i ? 'bg-orange-500' : 'bg-[var(--color-border)]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Company info */}
        {step === 0 && (
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-8">
            <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">Votre entreprise</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { field: 'contactName', placeholder: 'Nom du contact *', type: 'text' },
                { field: 'contactEmail', placeholder: 'Email professionnel *', type: 'email' },
                { field: 'contactPhone', placeholder: 'Téléphone', type: 'tel' },
                { field: 'companyName', placeholder: 'Nom de l\'entreprise *', type: 'text' },
                { field: 'industry', placeholder: 'Secteur d\'activité', type: 'text' },
              ].map(({ field, placeholder, type }) => (
                <input key={field} type={type} placeholder={placeholder} value={form[field]} onChange={e => update(field, e.target.value)}
                  className="px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-orange-500" />
              ))}
              <select value={form.companySize} onChange={e => update('companySize', e.target.value)}
                className="px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Taille de l'entreprise</option>
                {['1-50', '51-200', '201-500', '500+'].map(s => <option key={s} value={s}>{s} employés</option>)}
              </select>
            </div>
            <button disabled={!form.contactName || !form.contactEmail || !form.companyName}
              onClick={() => setStep(1)}
              className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-40 transition flex items-center justify-center gap-2">
              Continuer <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 1: Needs */}
        {step === 1 && (
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-8">
            <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">Vos besoins</h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { field: 'userCount', label: 'Utilisateurs', icon: Users },
                { field: 'assetCount', label: 'Actifs', icon: Package },
                { field: 'buildingCount', label: 'Bâtiments', icon: Building2 }
              ].map(({ field, label, icon: Icon }) => (
                <div key={field}>
                  <label className="text-sm font-medium text-[var(--color-muted)] mb-1 flex items-center gap-1">
                    <Icon className="w-3 h-3" /> {label}
                  </label>
                  <input type="number" min="1" value={form[field]} onChange={e => update(field, +e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-[var(--color-muted)] mb-3 block">Durée d'engagement</label>
              <div className="grid grid-cols-3 gap-3">
                {[12, 24, 36].map(m => (
                  <button key={m} onClick={() => update('contractMonths', m)}
                    className={`p-3 border-2 rounded-xl text-center transition ${
                      form.contractMonths === m ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-[var(--color-border)]'
                    }`}>
                    <div className="font-bold text-[var(--color-foreground)]">{m} mois</div>
                    {m >= 24 && <div className="text-xs text-green-500 mt-0.5">-5% supplémentaire</div>}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-[var(--color-muted)] mb-3 block">Options et modules</label>
              <div className="space-y-2">
                {FEATURES.map(f => (
                  <label key={f.id} className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition ${
                    form.features.includes(f.id) ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-[var(--color-border)] hover:border-orange-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={form.features.includes(f.id)} onChange={() => toggleFeature(f.id)} className="accent-orange-500" />
                      <div>
                        <p className="text-sm font-medium text-[var(--color-foreground)]">{f.label}</p>
                        <p className="text-xs text-[var(--color-muted)]">{f.description}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-orange-500">
                      {f.price === 0 ? 'Inclus' : `+${f.price}€`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="px-6 py-3 border border-[var(--color-border)] rounded-xl text-[var(--color-muted)] hover:bg-[var(--color-bg)] transition">Retour</button>
              <button onClick={() => setStep(2)} className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2">
                Voir le récapitulatif <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Summary & submit */}
        {step === 2 && (
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-8">
            <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" /> Récapitulatif de votre devis
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase mb-3">Votre configuration</h3>
                <ul className="space-y-2 text-sm text-[var(--color-foreground)]">
                  <li className="flex justify-between"><span>Utilisateurs</span> <strong>{form.userCount}</strong></li>
                  <li className="flex justify-between"><span>Actifs</span> <strong>{form.assetCount}</strong></li>
                  <li className="flex justify-between"><span>Bâtiments</span> <strong>{form.buildingCount}</strong></li>
                  <li className="flex justify-between"><span>Engagement</span> <strong>{form.contractMonths} mois</strong></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase mb-3">Tarification</h3>
                {pricing ? (
                  <ul className="space-y-2 text-sm text-[var(--color-foreground)]">
                    <li className="flex justify-between"><span>Base Enterprise</span> <span>{pricing.monthlyBase}€/mois</span></li>
                    {pricing.perUserPrice > 0 && <li className="flex justify-between"><span>Supplément users</span> <span>+{pricing.perUserPrice}€/mois</span></li>}
                    {pricing.discountPercent > 0 && <li className="flex justify-between text-green-500"><span>Remise volume</span> <span>−{pricing.discountPercent}%</span></li>}
                    {pricing.setupFee > 0 && <li className="flex justify-between"><span>Frais de setup</span> <span>{pricing.setupFee}€</span></li>}
                    <li className="flex justify-between pt-3 border-t border-[var(--color-border)] font-bold text-base">
                      <span>Total mensuel</span>
                      <span className="text-orange-500">{pricing.totalMonthly?.toFixed(2)}€</span>
                    </li>
                    <li className="flex justify-between text-[var(--color-muted)]">
                      <span>Total annuel</span>
                      <span>{pricing.totalYearly?.toFixed(2)}€</span>
                    </li>
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 text-[var(--color-muted)]">
                    <Loader2 className="w-4 h-4 animate-spin" /> Calcul en cours...
                  </div>
                )}
              </div>
            </div>

            {form.features.length > 0 && (
              <div className="mb-6 p-4 bg-[var(--color-bg)] rounded-xl">
                <p className="text-sm font-semibold text-[var(--color-muted)] mb-2">Options sélectionnées</p>
                <div className="flex flex-wrap gap-2">
                  {form.features.map(id => {
                    const f = FEATURES.find(x => x.id === id);
                    return <span key={id} className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-600 px-2 py-1 rounded-full">{f?.label}</span>;
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 border border-[var(--color-border)] rounded-xl text-[var(--color-muted)] hover:bg-[var(--color-bg)] transition">Retour</button>
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-50 transition flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Envoyer ma demande de devis
              </button>
            </div>
            <p className="text-xs text-center text-[var(--color-muted)] mt-3">Réponse garantie sous 24h ouvrables · Sans engagement</p>
          </div>
        )}
      </div>
    </div>
  );
}
