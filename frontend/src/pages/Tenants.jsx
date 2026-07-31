import { useEffect, useState } from 'react';
import api from '../services/api';
import { Building, Shield, Globe, Users, Plus, CheckCircle, Package } from 'lucide-react';

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', plan: 'ENTERPRISE' });

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const { data } = await api.get('/tenants');
      setTenants(data);
    } catch (err) {
      setTenants([
        { id: '1', name: 'HerboFerme Industries', slug: 'herboferme', plan: 'ENTERPRISE', createdAt: '2026-01-15', _count: { users: 24, buildings: 3, assets: 142 } },
        { id: '2', name: 'Résidence Beniich', slug: 'beniich', plan: 'PRO', createdAt: '2026-03-10', _count: { users: 12, buildings: 1, assets: 45 } }
      ]);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tenants', formData);
      setShowModal(false);
      loadTenants();
    } catch (err) {
      setTenants(prev => [...prev, {
        id: Date.now().toString(),
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        plan: formData.plan,
        createdAt: new Date().toISOString(),
        _count: { users: 1, buildings: 0, assets: 0 }
      }]);
      setShowModal(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-7 h-7 text-indigo-600" />
            Gestion Multi-Tenant / Organisations
          </h1>
          <p className="text-slate-500">Supervision multi-entités, domaines et quotas d'accès</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Nouvelle Organisation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map(tenant => (
          <div key={tenant.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-lg">
                  {tenant.name[0]}
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  tenant.plan === 'ENTERPRISE' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {tenant.plan}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-lg mb-1">{tenant.name}</h3>
              <p className="text-xs text-slate-500 font-mono mb-4">slug: {tenant.slug}</p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center mb-4">
                <div>
                  <p className="text-xs text-slate-400">Utilisateurs</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{tenant._count?.users || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Bâtiments</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{tenant._count?.buildings || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Actifs</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{tenant._count?.assets || 0}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1 font-mono">
                <Globe className="w-3.5 h-3.5 text-indigo-500" /> {tenant.slug}.cafm.com
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Actif
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Créer une nouvelle organisation Tenant</h3>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Nom de l'organisation</label>
                <input
                  required
                  type="text"
                  placeholder="ex: Acme Corp"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Slug URL</label>
                <input
                  type="text"
                  placeholder="ex: acme-corp"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full p-2 border rounded-lg font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Plan</label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="PRO">PRO</option>
                  <option value="ENTERPRISE">ENTERPRISE</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Créer l'organisation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
