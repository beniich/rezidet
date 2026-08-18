import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Search, Download, Copy, Trash2, RefreshCw,
  Key, CheckCircle2, Clock, Ban, X
} from 'lucide-react';
import api from '../services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const STATUS_CONFIG = {
  AVAILABLE: {
    label: 'Disponible',
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: CheckCircle2
  },
  USED: {
    label: 'Utilisée',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: Key
  },
  EXPIRED: {
    label: 'Expirée',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: Clock
  },
  REVOKED: {
    label: 'Révoquée',
    color: 'bg-red-100 text-red-700 border-red-200',
    icon: Ban
  }
};

const PLAN_COLORS = {
  FREE: 'bg-slate-100 text-slate-700',
  PRO: 'bg-blue-100 text-blue-700',
  ENTERPRISE: 'bg-purple-100 text-purple-700'
};

export default function LicensesAdmin() {
  const [licenses, setLicenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({ status: '', plan: '', search: '' });
  const [showGenerate, setShowGenerate] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [filters, page]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        api.get('/licenses', {
          params: { ...filters, page, search: filters.search || undefined }
        }),
        api.get('/licenses/stats')
      ]);
      setLicenses(listRes.data.licenses);
      setPagination(listRes.data.pagination);
      setStats(statsRes.data);
    } catch (err) {
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    toast.success('Clé copiée !');
  };

  const handleRevoke = async (id) => {
    const reason = prompt('Raison de la révocation :');
    if (!reason) return;
    try {
      await api.post(`/licenses/${id}/revoke`, { reason });
      toast.success('Licence révoquée');
      loadData();
    } catch (err) {
      toast.error('Erreur');
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/licenses/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `licenses-${Date.now()}.csv`;
      link.click();
    } catch (err) {
      toast.error("Erreur lors de l'exportation");
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Key className="w-7 h-7 text-primary-600" />
            Gestion des Licences
          </h1>
          <p className="text-slate-500 mt-1">Stock de clés d'accès au dashboard</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50 text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Exporter CSV
          </button>
          <button
            onClick={() => setShowGenerate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Générer des licences
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Stock disponible', value: stats.available, color: 'text-green-600', sub: 'Prêtes à distribuer' },
            { label: 'Utilisées', value: stats.used, color: 'text-blue-600', sub: 'Comptes actifs' },
            { label: 'Révoquées', value: stats.revoked, color: 'text-red-600', sub: 'Désactivées' },
            { label: 'Total générées', value: stats.total, color: 'text-purple-600', sub: 'Toutes périodes' }
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border p-5">
              <p className="text-sm text-slate-500 mb-1">{s.label}</p>
              <p className={clsx('text-3xl font-bold', s.color)}>{s.value ?? 0}</p>
              <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 mb-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            placeholder="Rechercher par clé, email..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm"
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Tous statuts</option>
          <option value="AVAILABLE">Disponible</option>
          <option value="USED">Utilisée</option>
          <option value="EXPIRED">Expirée</option>
          <option value="REVOKED">Révoquée</option>
        </select>
        <select
          value={filters.plan}
          onChange={(e) => setFilters({ ...filters, plan: e.target.value })}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Tous plans</option>
          <option value="FREE">Free</option>
          <option value="PRO">Pro</option>
          <option value="ENTERPRISE">Enterprise</option>
        </select>
        <button onClick={loadData} className="p-2 hover:bg-slate-100 rounded-lg">
          <RefreshCw className={clsx('w-4 h-4', loading && 'animate-spin')} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr className="text-left text-xs font-medium text-slate-500 uppercase">
              <th className="px-6 py-3">Clé</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Statut</th>
              <th className="px-6 py-3">Utilisée par</th>
              <th className="px-6 py-3">Générée le</th>
              <th className="px-6 py-3">Expire le</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {licenses.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-16 text-center text-slate-400">
                  <Key className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="font-medium">Aucune licence</p>
                  <p className="text-sm">Générez votre premier lot</p>
                </td>
              </tr>
            ) : licenses.map(license => {
              const statusConfig = STATUS_CONFIG[license.status] || STATUS_CONFIG.AVAILABLE;
              const StatusIcon = statusConfig.icon;
              return (
                <tr key={license.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">{license.key}</code>
                      <button onClick={() => handleCopy(license.key)} className="p-1 hover:bg-slate-200 rounded">
                        <Copy className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={clsx('text-xs px-2 py-1 rounded-full font-medium', PLAN_COLORS[license.plan] || PLAN_COLORS.PRO)}>
                      {license.plan}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={clsx('inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border font-medium', statusConfig.color)}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    {license.usedByName ? (
                      <div>
                        <p className="font-medium">{license.usedByName}</p>
                        <p className="text-xs text-slate-500">{license.usedByEmail}</p>
                      </div>
                    ) : <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-600">
                    {format(new Date(license.generatedAt), 'dd MMM yyyy', { locale: fr })}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-600">
                    {license.expiresAt ? format(new Date(license.expiresAt), 'dd MMM yyyy', { locale: fr }) : '∞'}
                  </td>
                  <td className="px-6 py-3 text-right">
                    {license.status === 'AVAILABLE' && (
                      <button
                        onClick={() => handleRevoke(license.id)}
                        className="p-1.5 hover:bg-red-50 text-red-500 rounded"
                        title="Révoquer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {pagination.pages > 1 && (
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-slate-500">{pagination.total} licences au total</p>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded text-sm disabled:opacity-40"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >Précédent</button>
              <span className="px-3 py-1 text-sm">Page {page} / {pagination.pages}</span>
              <button
                className="px-3 py-1 border rounded text-sm disabled:opacity-40"
                disabled={page >= pagination.pages}
                onClick={() => setPage(p => p + 1)}
              >Suivant</button>
            </div>
          </div>
        )}
      </div>

      {showGenerate && (
        <GenerateModal
          onClose={() => setShowGenerate(false)}
          onSuccess={() => { setShowGenerate(false); loadData(); }}
        />
      )}
    </div>
  );
}

function GenerateModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    plan: 'PRO', quantity: 20, durationDays: 365,
    maxUsers: 25, maxAssets: 1000, notes: ''
  });
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/licenses/generate', form);
      setGenerated(data);
      toast.success(`${data.count} licences générées !`);
    } catch (err) {
      toast.error('Erreur lors de la génération');
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated.licenses.map(l => l.key).join('\n'));
    toast.success(`${generated.count} clés copiées !`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">Générer des licences</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>

        {!generated ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Plan</label>
              <select value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                <option value="FREE">Free</option>
                <option value="PRO">Pro</option>
                <option value="ENTERPRISE">Enterprise</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Quantité</label>
                <input type="number" min="1" max="100" value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Durée (jours)</label>
                <input type="number" min="1" value={form.durationDays}
                  onChange={e => setForm({ ...form, durationDays: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Max users</label>
                <input type="number" value={form.maxUsers}
                  onChange={e => setForm({ ...form, maxUsers: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Max assets</label>
                <input type="number" value={form.maxAssets}
                  onChange={e => setForm({ ...form, maxAssets: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Notes (optionnel)</label>
              <input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="Ex: Lot Q1 2025" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="flex gap-2 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg text-sm">Annuler</button>
              <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">
                {loading ? 'Génération...' : `Générer ${form.quantity} licences`}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <p className="font-semibold text-green-900">{generated.count} licences générées !</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 mb-4 max-h-64 overflow-y-auto">
              {generated.licenses.map((l, i) => (
                <div key={l.id} className="flex items-center gap-2 py-1">
                  <span className="text-xs text-slate-500 w-6">{i + 1}.</span>
                  <code className="font-mono text-xs flex-1">{l.key}</code>
                  <button onClick={() => navigator.clipboard.writeText(l.key)} className="p-1 hover:bg-slate-200 rounded">
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={copyAll} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm">
                <Copy className="w-4 h-4" /> Tout copier
              </button>
              <button onClick={onSuccess} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                Terminé
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
