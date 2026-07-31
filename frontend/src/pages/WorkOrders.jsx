import { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, ClipboardList, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const statusConfig = {
  PENDING: { label: 'En attente', color: 'bg-slate-100 text-slate-700', icon: Clock },
  IN_PROGRESS: { label: 'En cours', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  COMPLETED: { label: 'Terminé', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  CANCELLED: { label: 'Annulé', color: 'bg-red-100 text-red-700', icon: XCircle }
};

const priorityColors = {
  LOW: 'border-l-slate-400',
  MEDIUM: 'border-l-blue-500',
  HIGH: 'border-l-orange-500',
  CRITICAL: 'border-l-red-500'
};

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/workorders')
      .then(({ data }) => setWorkOrders(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? workOrders : workOrders.filter((wo) => wo.status === filter);

  const stats = {
    total: workOrders.length,
    pending: workOrders.filter((w) => w.status === 'PENDING').length,
    inProgress: workOrders.filter((w) => w.status === 'IN_PROGRESS').length,
    completed: workOrders.filter((w) => w.status === 'COMPLETED').length
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ordres de travail</h1>
          <p className="text-slate-500">Gestion et suivi des interventions</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
          <Plus className="w-4 h-4" />
          Nouvel ordre
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'slate' },
          { label: 'En attente', value: stats.pending, color: 'slate' },
          { label: 'En cours', value: stats.inProgress, color: 'blue' },
          { label: 'Terminés', value: stats.completed, color: 'green' }
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
              filter === f ? 'bg-primary-600 text-white' : 'bg-white text-slate-700 border border-slate-300'
            }`}
          >
            {f === 'ALL' ? 'Tous' : statusConfig[f].label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Chargement...</div>
        ) : filtered.map((wo) => {
          const Status = statusConfig[wo.status];
          return (
            <div key={wo.id} className={`bg-white rounded-xl border-l-4 ${priorityColors[wo.priority]} border border-slate-200 p-5 hover:shadow-sm transition`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList className="w-4 h-4 text-slate-400" />
                    <h3 className="font-semibold text-slate-900">{wo.title}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${Status.color}`}>
                      {Status.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{wo.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>📍 {wo.asset?.location} • {wo.asset?.name}</span>
                    <span>👤 {wo.assignedTo?.firstName} {wo.assignedTo?.lastName}</span>
                    <span>📅 {format(new Date(wo.scheduledAt), 'dd MMM yyyy', { locale: fr })}</span>
                    <span>💰 {wo.estimatedCost?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    wo.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                    wo.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                    wo.priority === 'MEDIUM' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {wo.priority}
                  </span>
                  <span className="text-xs text-slate-500">{wo.type}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
