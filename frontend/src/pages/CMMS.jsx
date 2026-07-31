import { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Package, AlertTriangle, TrendingUp, Wrench, Search,
  Plus, ArrowUpCircle, ArrowDownCircle, Settings, FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CMMS() {
  const [tab, setTab] = useState('parts');
  const [parts, setParts] = useState([]);
  const [stats, setStats] = useState(null);
  const [movements, setMovements] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [failureAnalysis, setFailureAnalysis] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (tab === 'parts') {
      api.get('/cmms/parts')
        .then(({ data }) => {
          setParts(data.parts || []);
          setStats(data.stats || { totalParts: 0, lowStockCount: 0, outOfStock: 0, totalValue: 0 });
        })
        .catch(() => {
          setParts([
            { id: '1', partNumber: 'FILT-HVAC-01', name: 'Filtre à air HVAC HEPA', category: 'HVAC', quantity: 12, minQuantity: 5, maxQuantity: 50, unitCost: 45.0, unit: 'unité' },
            { id: '2', partNumber: 'POMP-EAU-02', name: 'Pompe centrifuge 2.5 kW', category: 'Plomberie', quantity: 2, minQuantity: 3, maxQuantity: 10, unitCost: 680.0, unit: 'unité' },
            { id: '3', partNumber: 'CAP-TEMP-03', name: 'Capteur Température Zigbee', category: 'IoT', quantity: 0, minQuantity: 5, maxQuantity: 30, unitCost: 29.90, unit: 'unité' }
          ]);
          setStats({ totalParts: 3, lowStockCount: 2, outOfStock: 1, totalValue: 1900 });
        });
    } else if (tab === 'movements') {
      api.get('/cmms/movements')
        .then(({ data }) => setMovements(data))
        .catch(() => setMovements([]));
    } else if (tab === 'procedures') {
      api.get('/cmms/procedures')
        .then(({ data }) => setProcedures(data))
        .catch(() => setProcedures([]));
    } else if (tab === 'analysis') {
      api.get('/cmms/failures/analysis')
        .then(({ data }) => setFailureAnalysis(data))
        .catch(() => setFailureAnalysis({
          byCategory: [
            { category: 'HVAC', count: 18 },
            { category: 'Électricité', count: 12 },
            { category: 'Plomberie', count: 7 },
            { category: 'Ascenseurs', count: 4 }
          ],
          mttr: 2.8,
          totalFailures: 41
        }));
    }
  }, [tab]);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Wrench className="w-7 h-7 text-indigo-600" />
          Module CMMS / GMAO
        </h1>
        <p className="text-slate-500">Gestion de la maintenance assistée par ordinateur & stocks</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {[
          { id: 'parts', label: 'Pièces détachées', icon: Package },
          { id: 'movements', label: 'Mouvements stock', icon: TrendingUp },
          { id: 'procedures', label: 'Procédures', icon: FileText },
          { id: 'analysis', label: 'Analyse défaillances', icon: AlertTriangle }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition ${
              tab === t.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Parts Tab */}
      {tab === 'parts' && stats && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">Total pièces</p>
              <p className="text-2xl font-bold mt-1 text-slate-900">{stats.totalParts}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">Stock bas</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{stats.lowStockCount}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">Rupture</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.outOfStock}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">Valeur stock</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {(stats.totalValue / 1000).toFixed(1)}k €
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  placeholder="Rechercher une pièce par nom ou référence..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                <Plus className="w-4 h-4" /> Nouvelle pièce
              </button>
            </div>
            <table className="w-full text-slate-800">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-left text-xs font-medium text-slate-500 uppercase">
                  <th className="px-6 py-3">Référence</th>
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Catégorie</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Min / Max</th>
                  <th className="px-6 py-3">Prix unitaire</th>
                  <th className="px-6 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y border-slate-100">
                {parts.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.partNumber.toLowerCase().includes(search.toLowerCase())).map(part => {
                  const status = part.quantity === 0 ? 'RUPTURE' : part.quantity <= part.minQuantity ? 'BAS' : 'OK';
                  return (
                    <tr key={part.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-700">{part.partNumber}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{part.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{part.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold">{part.quantity} {part.unit || 'unités'}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{part.minQuantity} / {part.maxQuantity}</td>
                      <td className="px-6 py-4 text-sm font-mono">{part.unitCost.toFixed(2)} €</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          status === 'RUPTURE' ? 'bg-red-100 text-red-700' :
                          status === 'BAS' ? 'bg-orange-100 text-orange-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {status === 'RUPTURE' ? '⚠️ Rupture' : status === 'BAS' ? '⚡ Bas' : '✓ OK'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Failure Analysis */}
      {tab === 'analysis' && failureAnalysis && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Pareto des défaillances par catégorie</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={failureAnalysis.byCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Indicateurs de Maintenance (MTTR / MTBF)</h3>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-700 font-semibold uppercase">MTTR (Mean Time To Repair)</p>
                <p className="text-3xl font-bold text-indigo-900 mt-1">{failureAnalysis.mttr} heures</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-xs text-orange-700 font-semibold uppercase">Total Défaillances enregistrées</p>
                <p className="text-3xl font-bold text-orange-900 mt-1">{failureAnalysis.totalFailures}</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-xs text-emerald-700 font-semibold uppercase">Disponibilité Équipements</p>
                <p className="text-3xl font-bold text-emerald-900 mt-1">98.4%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
