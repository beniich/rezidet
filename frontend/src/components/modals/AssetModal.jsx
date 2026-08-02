import { useState, useEffect } from 'react';
import Modal from './Modal';
import api from '../../services/api';
import toast from 'react-hot-toast';

/**
 * Modal de création/édition d'un actif
 * @param {boolean} open
 * @param {function} onClose
 * @param {object} asset - Actif à éditer (null pour création)
 * @param {function} onSuccess - Callback après succès
 */
export default function AssetModal({ open, onClose, asset, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    category: 'HVAC',
    serialNumber: '',
    manufacturer: '',
    model: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    purchasePrice: 0,
    warrantyEnd: '',
    location: '',
    buildingId: '',
    status: 'OPERATIONAL'
  });
  const [buildings, setBuildings] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      loadBuildings();
      if (asset) {
        setForm({
          name: asset.name || '',
          category: asset.category || 'HVAC',
          serialNumber: asset.serialNumber || '',
          manufacturer: asset.manufacturer || '',
          model: asset.model || '',
          purchaseDate: asset.purchaseDate?.split('T')[0] || '',
          purchasePrice: asset.purchasePrice || 0,
          warrantyEnd: asset.warrantyEnd?.split('T')[0] || '',
          location: asset.location || '',
          buildingId: asset.buildingId || '',
          status: asset.status || 'OPERATIONAL'
        });
      } else {
        setForm({
          name: '',
          category: 'HVAC',
          serialNumber: '',
          manufacturer: '',
          model: '',
          purchaseDate: new Date().toISOString().split('T')[0],
          purchasePrice: 0,
          warrantyEnd: '',
          location: '',
          buildingId: '',
          status: 'OPERATIONAL'
        });
      }
    }
  }, [open, asset]);

  const loadBuildings = async () => {
    try {
      const { data } = await api.get('/buildings');
      setBuildings(data);
      if (data.length > 0 && !form.buildingId) {
        setForm((f) => ({ ...f, buildingId: data[0].id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (asset) {
        await api.put(`/assets/${asset.id}`, form);
        toast.success('Actif mis à jour');
      } else {
        await api.post('/assets', form);
        toast.success('Actif créé');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const categories = ['HVAC', 'Electrical', 'Furniture', 'IT', 'Security', 'Plumbing', 'Lighting'];
  const statuses = [
    { value: 'OPERATIONAL', label: 'Opérationnel' },
    { value: 'MAINTENANCE', label: 'En maintenance' },
    { value: 'BREAKDOWN', label: 'En panne' },
    { value: 'RETIRED', label: 'Retiré' }
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={asset ? 'Modifier l\'actif' : 'Nouvel actif'}
      size="lg"
      footer={
        <>
          <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            Annuler
          </button>
          <button
            type="submit"
            form="asset-form"
            disabled={saving}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </>
      }
    >
      <form id="asset-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="HVAC Zone A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie *</label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">N° Série *</label>
            <input
              required
              value={form.serialNumber}
              onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Fabricant</label>
            <input
              value={form.manufacturer}
              onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Modèle</label>
          <input
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date d'achat</label>
            <input
              type="date"
              value={form.purchaseDate}
              onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Prix (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.purchasePrice}
              onChange={(e) => setForm({ ...form, purchasePrice: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Fin garantie</label>
            <input
              type="date"
              value={form.warrantyEnd}
              onChange={(e) => setForm({ ...form, warrantyEnd: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bâtiment *</label>
            <select
              required
              value={form.buildingId}
              onChange={(e) => setForm({ ...form, buildingId: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Sélectionner...</option>
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Localisation</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Étage 3, Zone B"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Statut</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  );
}
