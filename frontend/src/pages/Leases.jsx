import { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, FileText, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

export default function Leases() {
  const [leases, setLeases] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Baux & Contrats</h1>
          <p className="text-slate-500">{leases.length} baux enregistrés</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg"
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
                <span className={`text-xs px-2 py-1 rounded-full ${
                  lease.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100'
                }`}>
                  {lease.status}
                </span>
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

      {showModal && <LeaseModal buildings={buildings} onClose={() => setShowModal(false)} onSuccess={loadData} />}
    </div>
  );
}

function LeaseModal({ buildings, onClose, onSuccess }) {
  const [form, setForm] = useState({
    tenant: '', buildingId: buildings[0]?.id || '',
    startDate: '', endDate: '', monthlyRent: 0, deposit: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/leases', form);
      toast.success('Bail créé');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Nouveau bail</h2>
          </div>
          <div className="p-6 space-y-3">
            <input required placeholder="Locataire" value={form.tenant} onChange={e => setForm({...form, tenant: e.target.value})} className="w-full px-3 py-2 border rounded" />
            <select value={form.buildingId} onChange={e => setForm({...form, buildingId: e.target.value})} className="w-full px-3 py-2 border rounded">
              {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input type="date" required value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="px-3 py-2 border rounded" />
              <input type="date" required value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} className="px-3 py-2 border rounded" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Loyer mensuel" value={form.monthlyRent} onChange={e => setForm({...form, monthlyRent: +e.target.value})} className="px-3 py-2 border rounded" />
              <input type="number" placeholder="Dépôt" value={form.deposit} onChange={e => setForm({...form, deposit: +e.target.value})} className="px-3 py-2 border rounded" />
            </div>
          </div>
          <div className="p-6 border-t flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2">Annuler</button>
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg">Créer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
