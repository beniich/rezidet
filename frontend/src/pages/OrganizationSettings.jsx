import { useState, useEffect } from 'react';
import { Building2, Save, Palette, Globe, Users, Shield, Key, Upload } from 'lucide-react';
import { useTenantStore } from '../store/tenantStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function OrganizationSettings() {
  const { tenant, loadTenant, updateTenant } = useTenantStore();
  const { user } = useAuthStore();
  const [form, setForm] = useState({ name: '', logo: '' });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    loadTenant();
  }, []);

  useEffect(() => {
    if (tenant) {
      setForm({ name: tenant.name || '', logo: tenant.logo || '' });
    }
  }, [tenant]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateTenant(form);
      toast.success('Organisation mise à jour !');
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'Général', icon: Building2 },
    { id: 'branding', label: 'Branding & Logo', icon: Palette },
    { id: 'members', label: 'Membres', icon: Users },
    { id: 'security', label: 'Sécurité', icon: Shield },
  ];

  return (
    <div className="p-8 bg-background min-h-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-50 font-display tracking-widest uppercase">
              Organisation
            </h1>
            <p className="text-xs text-zinc-500 font-mono tracking-widest">
              {tenant?.name || '—'} · Plan {tenant?.plan || '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-zinc-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-widest transition-all -mb-px ${
              activeTab === tab.id
                ? 'text-orange-400 border-b-2 border-orange-500'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Général */}
      {activeTab === 'general' && (
        <form onSubmit={handleSave} className="max-w-2xl space-y-6">
          <div className="bg-surface border border-zinc-800 rounded-lg p-6 space-y-5">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-widest font-mono">
              Informations de l'organisation
            </h2>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                Nom de l'organisation
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2.5 text-sm text-zinc-100 font-mono focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Nom de votre organisation"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                ID de l'organisation
              </label>
              <input
                type="text"
                value={tenant?.id || ''}
                readOnly
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-600 font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                Plan
              </label>
              <div className="px-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded text-sm text-orange-400 font-mono">
                {tenant?.plan || '—'}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono uppercase tracking-widest rounded transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Enregistrement...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      )}

      {/* Tab: Branding */}
      {activeTab === 'branding' && (
        <div className="max-w-2xl space-y-6">
          <form onSubmit={handleSave} className="bg-surface border border-zinc-800 rounded-lg p-6 space-y-5">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-widest font-mono">
              Logo & Identité visuelle
            </h2>

            {/* Logo Preview */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-xl border-2 border-dashed border-zinc-700 flex items-center justify-center overflow-hidden bg-zinc-900">
                {form.logo ? (
                  <img src={form.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-zinc-600 mx-auto mb-1" />
                    <p className="text-[10px] text-zinc-600 font-mono">Logo</p>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-400 font-mono mb-2">URL du logo de l'organisation</p>
                <p className="text-[11px] text-zinc-600 font-mono">Formats acceptés : PNG, JPG, SVG, WebP</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                URL du logo
              </label>
              <input
                type="url"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2.5 text-sm text-zinc-100 font-mono focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="https://votre-domaine.com/logo.png"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono uppercase tracking-widest rounded transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Enregistrement...' : 'Sauvegarder le logo'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Membres */}
      {activeTab === 'members' && (
        <div className="max-w-4xl space-y-4">
          <div className="bg-surface border border-zinc-800 rounded-lg overflow-hidden">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-widest font-mono">
                Membres de l'organisation
              </h2>
              <span className="text-xs text-zinc-500 font-mono">
                Tenant: {tenant?.slug || '—'}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded border border-zinc-800">
                <div className="w-9 h-9 bg-orange-500/15 border border-orange-500/30 rounded-sm flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-orange-400">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-zinc-100 font-mono">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-zinc-500 font-mono">{user?.email}</p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded-full">
                    {user?.role}
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-600 font-mono text-center mt-4">
                Gestion multi-utilisateurs — Invitez vos équipes via l'API /api/auth/register
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Sécurité */}
      {activeTab === 'security' && (
        <div className="max-w-2xl space-y-4">
          <div className="bg-surface border border-zinc-800 rounded-lg p-6">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-widest font-mono mb-5">
              Informations de sécurité
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="flex items-center gap-3">
                  <Key className="w-4 h-4 text-orange-400" />
                  <div>
                    <p className="text-xs text-zinc-100 font-mono">Authentification JWT</p>
                    <p className="text-[10px] text-zinc-600 font-mono">Expiration : 7 jours</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <div>
                    <p className="text-xs text-zinc-100 font-mono">Isolation des données</p>
                    <p className="text-[10px] text-zinc-600 font-mono">
                      Tenant ID: {tenant?.id?.slice(0, 8)}...
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  ACTIF
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-orange-400" />
                  <div>
                    <p className="text-xs text-zinc-100 font-mono">Domaine</p>
                    <p className="text-[10px] text-zinc-600 font-mono">{tenant?.slug}.cafm.sovereign</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
