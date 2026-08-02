import { useEffect, useState } from 'react';
import api from '../services/api';
import { Wrench, Clock, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS = {
  PENDING: { label: 'En attente', color: 'bg-slate-100 text-slate-700', icon: Clock },
  IN_PROGRESS: { label: 'En cours', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  COMPLETED: { label: 'Terminé', color: 'bg-green-100 text-green-700', icon: CheckCircle }
};

export default function Maintenance() {
  const [wos, setWos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    api.get('/cmms/work-orders')
      .then(({ data }) => setWos(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? wos : wos.filter(w => w.status === filter);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/cmms/work-orders/${id}`, { status });
      toast.success('Statut mis à jour');
      setWos(prev => prev.map(w => w.id === id ? { ...w, status } : w));
    } catch (err) {
      toast.error('Erreur');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wrench className="w-7 h-7 text-primary-600" />
          Maintenance
        </h1>
        <p className="text-slate-500">{wos.length} interventions</p>
      </div>

      <div className="flex gap-2 mb-4">
        {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
              filter === f ? 'bg-primary-600 text-white' : 'bg-white border hover:bg-slate-50'
            }`}
          >
            {f === 'ALL' ? 'Toutes' : STATUS[f].label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-8 text-slate-500">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center text-slate-400">
            Aucune intervention
          </div>
        ) : (
          filtered.map(wo => {
            const S = STATUS[wo.status];
            return (
              <div key={wo.id} className="bg-white rounded-xl border p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{wo.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${S.color}`}>{S.label}</span>
                  </div>
                  <p className="text-sm text-slate-500">{wo.asset?.name} • {wo.type}</p>
                </div>
                <select
                  value={wo.status}
                  onChange={(e) => updateStatus(wo.id, e.target.value)}
                  className="px-3 py-1.5 border rounded text-sm"
                >
                  {Object.entries(STATUS).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
