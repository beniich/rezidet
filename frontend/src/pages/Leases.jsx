import { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, FileText, Calendar, DollarSign, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

export default function Leases() {
  const [leases, setLeases] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLease, setEditingLease] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [l, b] = await Promise.all([
        api.get('/leases'),
        api.get('/buildings')
      ]);
      setLeases(l.data);
      setBuildings(b.data);
    } catch (err) {
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce bail ?')) return;
    try {
      await api.delete(`/leases/${id}`);
      toast.success('Bail supprimé');
      setLeases(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur');
    }
  };

  const openEdit   = (lease) => { setEditingLease(lease); setShowModal(true); };
  const openCreate = ()      => { setEditingLease(null);  setShowModal(true); };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Baux & Contrats</h1>
          <p className="text-slate-500">{leases.length} baux enregistrés</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
        >
          <Plus className="w-4 h-4" /> Nouveau bail
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Chargement...</div>
      ) : leases.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center text-slate-400">
          <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>Aucun bail. Créez-en un pour commencer.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leases.map(lease => (
            <div key={lease.id} className="bg-white rounded-xl border p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">{lease.tenant}</h3>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(lease)} className="p-1 text-zinc-400 hover:text-cyan-400 transition"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(lease.id)} className="p-1 text-zinc-400 hover:text-red-400 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                  <span className={`text-xs px-2 py-1 rounded-full ml-1 ${
                    lease.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100'
                  }`}>
                    {lease.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-3">
                {lease.building?.name || 'Bâtiment'}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>{lease.monthlyRent.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}/mois</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{format(new Date(lease.startDate), 'dd MMM yyyy', { locale: fr })} → {format(new Date(lease.endDate), 'dd MMM yyyy', { locale: fr })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <LeaseModal
          buildings={buildings}
          lease={editingLease}
          onClose={() => { setShowModal(false); setEditingLease(null); }}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}

function LeaseModal({ buildings, lease, onClose, onSuccess }) {
  const isEdit = !!lease;
  const fmt = (d) => d ? new Date(d).toISOString().slice(0, 10) : '';

  const [form, setForm] = useState({
    tenant:      lease?.tenant      || '',
    buildingId:  lease?.buildingId  || buildings[0]?.id || '',
    startDate:   fmt(lease?.startDate),
    endDate:     fmt(lease?.endDate),
    monthlyRent: lease?.monthlyRent || 0,
    deposit:     lease?.deposit     || 0,
    status:      lease?.status      || 'active',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/leases/${lease.id}`, form);
        toast.success('Bail mis à jour');
      } else {
        await api.post('/leases', form);
        toast.success('Bail créé');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur');
    }
  };

  const field = (key, props) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
    className: 'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-400',
    ...props
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">{isEdit ? 'Modifier le bail' : 'Nouveau bail'}</h2>
          </div>
          <div className="p-6 space-y-3">
            <input required placeholder="Locataire" {...field('tenant')} />
            <select {...field('buildingId')}>
              {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            {isEdit && (
              <select {...field('status')}>
                <option value="active">Actif</option>
                <option value="expired">Expiré</option>
                <option value="terminated">Résilié</option>
              </select>
            )}
            <div className="grid grid-cols-2 gap-3">
              <input type="date" required {...field('startDate')} />
              <input type="date" required {...field('endDate')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Loyer mensuel" {...field('monthlyRent')} />
              <input type="number" placeholder="Dépôt de garantie" {...field('deposit')} />
            </div>
          </div>
          <div className="p-6 border-t flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Annuler</button>
            <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">
              {isEdit ? 'Enregistrer' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
