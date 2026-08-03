import { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, ClipboardList, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { KanbanBoard } from '../components/work-orders/KanbanBoard';
import { WorkOrderDrawer } from '../components/work-orders/WorkOrderDrawer';

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
  const [showModal, setShowModal] = useState(false);
  const [selectedWo, setSelectedWo] = useState(null);

  const loadData = () => {
    setLoading(true);
    api.get('/workorders')
      .then(({ data }) => setWorkOrders(data))
      .catch(err => toast.error('Erreur de chargement'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = filter === 'ALL' ? workOrders : workOrders.filter((wo) => wo.status === filter);

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic update
    setWorkOrders(prev => prev.map(wo => wo.id === id ? { ...wo, status: newStatus } : wo));
    
    try {
      await api.patch(`/workorders/${id}`, { status: newStatus });
      toast.success('Statut mis à jour');
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
      loadData(); // revert
    }
  };

  const handleUpdateWo = async (id, data) => {
    try {
      await api.patch(`/workorders/${id}`, data);
      setWorkOrders(prev => prev.map(wo => wo.id === id ? { ...wo, ...data } : wo));
      if (selectedWo?.id === id) {
        setSelectedWo(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      toast.error('Erreur');
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ordres de travail</h1>
          <p className="text-slate-500">Gestion et suivi des interventions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-4 h-4" />
          Nouvel ordre
        </button>
      </div>

      <div className="flex-1 min-h-0 -mx-8 px-8 pb-4">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Chargement...</div>
        ) : (
          <KanbanBoard
            workOrders={filtered}
            onStatusChange={handleStatusChange}
            onWorkOrderClick={setSelectedWo}
          />
        )}
      </div>

      <WorkOrderDrawer
        workOrder={selectedWo}
        open={!!selectedWo}
        onClose={() => setSelectedWo(null)}
        onUpdate={handleUpdateWo}
      />

      {showModal && (
        <WorkOrderModal
          onClose={() => setShowModal(false)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}

function WorkOrderModal({ onClose, onSuccess }) {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', type: 'PREVENTIVE', priority: 'MEDIUM',
    scheduledAt: '', assetId: '', estimatedCost: 0
  });

  useEffect(() => {
    api.get('/assets').then(({ data }) => {
      setAssets(data);
      if (data.length > 0) setForm(f => ({ ...f, assetId: data[0].id }));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        estimatedCost: Number(form.estimatedCost),
        scheduledAt: new Date(form.scheduledAt).toISOString()
      };
      await api.post('/workorders', payload);
      toast.success('Ordre de travail créé');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur lors de la création');
    }
  };

  const field = (key, props) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
    className: 'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500',
    ...props
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Nouvel ordre de travail</h2>
          </div>
          <div className="p-6 space-y-4">
            <input required placeholder="Titre de l'intervention" {...field('title')} />
            
            <textarea required placeholder="Description détaillée" {...field('description')} rows={3} />
            
            <select required {...field('assetId')}>
              {assets.length === 0 && <option value="">Chargement des actifs...</option>}
              {assets.map(a => <option key={a.id} value={a.id}>{a.name} ({a.location})</option>)}
            </select>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Type</label>
                <select required {...field('type')}>
                  <option value="PREVENTIVE">Préventif</option>
                  <option value="CORRECTIVE">Correctif</option>
                  <option value="INSPECTION">Inspection</option>
                  <option value="UPGRADE">Mise à niveau</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Priorité</label>
                <select required {...field('priority')}>
                  <option value="LOW">Basse</option>
                  <option value="MEDIUM">Moyenne</option>
                  <option value="HIGH">Haute</option>
                  <option value="CRITICAL">Critique</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Date prévue</label>
                <input type="datetime-local" required {...field('scheduledAt')} />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Coût estimé (€)</label>
                <input type="number" min="0" step="10" {...field('estimatedCost')} />
              </div>
            </div>
          </div>
          <div className="p-6 border-t flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">Annuler</button>
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Créer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
