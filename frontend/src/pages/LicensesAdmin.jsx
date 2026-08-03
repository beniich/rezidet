import React, { useState, useEffect } from 'react';
import { Key, Plus, Copy, CheckCircle, Clock, Search } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function LicensesAdmin() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [form, setForm] = useState({
    count: 1,
    plan: 'PRO',
    maxUsers: 10,
    expireDays: 365
  });

  useEffect(() => {
    loadLicenses();
  }, []);

  const loadLicenses = async () => {
    try {
      const { data } = await api.get('/licenses');
      setLicenses(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des licences');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const { data } = await api.post('/licenses/generate', form);
      toast.success(`${data.created} clé(s) générée(s)`);
      loadLicenses();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur de génération');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key);
    toast.success('Clé copiée');
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8 h-full flex flex-col gap-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Key className="w-6 h-6 text-orange-500" />
            Gestion des Licences
          </h1>
          <p className="text-slate-500">Générez et gérez les clés d'accès pour les nouveaux clients</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-slate-400" />
              Générer des Clés
            </h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de clés</label>
                <input
                  type="number"
                  min="1" max="100"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={form.count}
                  onChange={e => setForm({ ...form, count: parseInt(e.target.value) })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plan associé</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={form.plan}
                  onChange={e => setForm({ ...form, plan: e.target.value })}
                >
                  <option value="PRO">Pro</option>
                  <option value="ENTERPRISE">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Utilisateurs Max</label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={form.maxUsers}
                  onChange={e => setForm({ ...form, maxUsers: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Validité (Jours)</label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  value={form.expireDays}
                  onChange={e => setForm({ ...form, expireDays: parseInt(e.target.value) })}
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 transition-colors"
              >
                {isGenerating ? 'Génération...' : 'Générer'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="font-semibold text-slate-800">Clés existantes</h2>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Chercher une clé..." className="pl-9 pr-4 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-500">Clé</th>
                    <th className="px-4 py-3 font-medium text-slate-500">Plan</th>
                    <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                    <th className="px-4 py-3 font-medium text-slate-500">Expiration</th>
                    <th className="px-4 py-3 font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {licenses.map(lic => {
                    const isExpired = lic.expiresAt && new Date(lic.expiresAt) < new Date();
                    return (
                      <tr key={lic.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-slate-900">{lic.key}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${lic.plan === 'ENTERPRISE' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {lic.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {lic.isUsed ? (
                            <span className="flex items-center gap-1 text-green-600 text-xs font-medium"><CheckCircle className="w-3.5 h-3.5" /> Utilisée</span>
                          ) : isExpired ? (
                            <span className="flex items-center gap-1 text-red-600 text-xs font-medium"><Clock className="w-3.5 h-3.5" /> Expirée</span>
                          ) : (
                            <span className="flex items-center gap-1 text-slate-500 text-xs font-medium">Disponible</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {lic.expiresAt ? new Date(lic.expiresAt).toLocaleDateString() : 'Jamais'}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => copyToClipboard(lic.key)} className="text-slate-400 hover:text-orange-500 transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {licenses.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                        Aucune clé de licence générée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
