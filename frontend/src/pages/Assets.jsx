import { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, Plus, Package, Edit, Map, List } from 'lucide-react';
import { AssetModal } from '../components/modals';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AssetMapInteractive } from '../components/assets/AssetMapInteractive';
import clsx from 'clsx';

const STATUS_STYLE = {
  OPERATIONAL: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  MAINTENANCE:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  BREAKDOWN:    'bg-rose-500/10 text-rose-400 border-rose-500/20',
  RETIRED:      'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

const STATUS_LABEL = {
  OPERATIONAL: 'Opérationnel',
  MAINTENANCE: 'En maintenance',
  BREAKDOWN:   'En panne',
  RETIRED:     'Retiré',
};

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => { loadAssets(); }, [search, statusFilter]);

  const loadAssets = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const { data } = await api.get('/assets', { params });
      setAssets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (asset) => { setEditingAsset(asset); setShowModal(true); };
  const handleCreate = () => { setEditingAsset(null); setShowModal(true); };

  return (
    <div className="space-y-5 animate-in">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            {assets.length} actif{assets.length !== 1 ? 's' : ''} enregistré{assets.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-xl btn-gradient-orange text-white text-xs font-bold flex items-center gap-2 glow-orange-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          NOUVEL ACTIF
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card-purple border border-white/10 p-4 rounded-2xl flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Rechercher nom, série..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/30 border border-white/10 text-white rounded-xl pl-9 pr-4 py-2 text-xs font-mono focus:outline-none focus:border-orange-500/60 placeholder-zinc-500 transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-black/30 border border-white/10 text-zinc-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-500/60"
        >
          <option value="">Tous les statuts</option>
          <option value="OPERATIONAL">Opérationnel</option>
          <option value="MAINTENANCE">En maintenance</option>
          <option value="BREAKDOWN">En panne</option>
        </select>

        {/* View toggle */}
        <div className="flex items-center glass-card border border-white/10 rounded-xl p-1 gap-1">
          <button
            onClick={() => setViewMode('list')}
            className={clsx('p-1.5 rounded-lg transition-all', viewMode === 'list' ? 'bg-orange-500/20 text-orange-400' : 'text-zinc-400 hover:text-zinc-200')}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={clsx('p-1.5 rounded-lg transition-all', viewMode === 'map' ? 'bg-orange-500/20 text-orange-400' : 'text-zinc-400 hover:text-zinc-200')}
          >
            <Map className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="glass-card-purple border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 font-bold uppercase tracking-wider">
                  {['Actif', 'Catégorie', 'Emplacement', 'Santé', 'Statut', 'Prochaine maint.', 'Coût', ''].map((h) => (
                    <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan="8" className="py-16 text-center text-zinc-500 font-bold tracking-widest uppercase">Chargement...</td></tr>
                ) : assets.length === 0 ? (
                  <tr><td colSpan="8" className="py-16 text-center text-zinc-500 font-bold tracking-widest uppercase">Aucun actif trouvé</td></tr>
                ) : assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-100">{asset.name}</p>
                          <p className="text-zinc-500 font-mono text-[10px]">{asset.serialNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-zinc-300 font-bold">{asset.category}</td>
                    <td className="px-5 py-4 text-zinc-300">{asset.location}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/10 rounded-full h-1.5">
                          <div
                            className={clsx('h-1.5 rounded-full', asset.healthScore > 70 ? 'bg-emerald-500' : asset.healthScore > 40 ? 'bg-amber-500' : 'bg-rose-500')}
                            style={{ width: `${asset.healthScore}%` }}
                          />
                        </div>
                        <span className={clsx('font-bold', asset.healthScore > 70 ? 'text-emerald-400' : asset.healthScore > 40 ? 'text-amber-400' : 'text-rose-400')}>
                          {asset.healthScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={clsx('px-2.5 py-1 rounded border text-[10px] font-bold', STATUS_STYLE[asset.status])}>
                        {STATUS_LABEL[asset.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {asset.nextMaintenance ? format(new Date(asset.nextMaintenance), 'dd MMM yyyy', { locale: fr }) : '—'}
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {asset.purchasePrice?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }) ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleEdit(asset)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/20 text-zinc-400 hover:text-orange-400 transition-all cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-card-purple border border-white/10 rounded-2xl overflow-hidden" style={{ height: 600 }}>
          <AssetMapInteractive assets={assets} onAssetClick={handleEdit} />
        </div>
      )}

      <AssetModal open={showModal} onClose={() => setShowModal(false)} asset={editingAsset} onSuccess={loadAssets} />
    </div>
  );
}
