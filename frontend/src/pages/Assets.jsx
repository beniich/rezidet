import { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, Plus, Filter, Package, ThermometerSun, Edit, Trash2 } from 'lucide-react';
import { AssetModal } from '../components/modals';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AssetMapInteractive } from '../components/assets/AssetMapInteractive';
import { Map, List } from 'lucide-react';

const statusColors = {
  OPERATIONAL: 'bg-green-100 text-green-700',
  MAINTENANCE: 'bg-orange-100 text-orange-700',
  BREAKDOWN: 'bg-red-100 text-red-700',
  RETIRED: 'bg-slate-100 text-slate-700'
};

const statusLabels = {
  OPERATIONAL: 'Opérationnel',
  MAINTENANCE: 'En maintenance',
  BREAKDOWN: 'En panne',
  RETIRED: 'Retiré'
};

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'

  useEffect(() => {
    loadAssets();
  }, [search, statusFilter]);

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

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingAsset(null);
    setShowModal(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des actifs</h1>
          <p className="text-slate-500">{assets.length} actifs enregistrés</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
          <Plus className="w-4 h-4" />
          Nouvel actif
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex gap-3 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou numéro de série..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-slate-900"
        >
          <option value="">Tous les statuts</option>
          <option value="OPERATIONAL">Opérationnel</option>
          <option value="MAINTENANCE">En maintenance</option>
          <option value="BREAKDOWN">En panne</option>
        </select>
        
        <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md flex items-center gap-1 ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`p-1.5 rounded-md flex items-center gap-1 ${viewMode === 'map' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Map className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Actif</th>
                <th className="px-6 py-3">Catégorie</th>
                <th className="px-6 py-3">Emplacement</th>
                <th className="px-6 py-3">Santé</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3">Prochaine maint.</th>
                <th className="px-6 py-3">Coût</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="7" className="text-center py-12 text-slate-500">Chargement...</td></tr>
              ) : assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{asset.name}</p>
                        <p className="text-xs text-slate-500">{asset.serialNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{asset.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{asset.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            asset.healthScore > 70 ? 'bg-green-500' :
                            asset.healthScore > 40 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${asset.healthScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600">{asset.healthScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[asset.status]}`}>
                      {statusLabels[asset.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {asset.nextMaintenance ? format(new Date(asset.nextMaintenance), 'dd MMM yyyy', { locale: fr }) : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {asset.purchasePrice?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(asset)} className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-[600px] border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
          <AssetMapInteractive assets={assets} onAssetClick={handleEdit} />
        </div>
      )}

      <AssetModal
        open={showModal}
        onClose={() => setShowModal(false)}
        asset={editingAsset}
        onSuccess={loadAssets}
      />
    </div>
  );
}
