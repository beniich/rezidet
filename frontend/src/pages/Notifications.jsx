import { useEffect, useState } from 'react';
import api from '../services/api';
import { Bell, Check, Clock, Shield, Sliders, CheckCircle } from 'lucide-react';
import PermissionPrompt from '../components/push/PermissionPrompt';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    workOrderAssigned: true,
    workOrderCompleted: true,
    assetAlerts: true,
    sensorAlerts: true,
    leaseExpiring: true,
    inventoryLow: true,
    emailEnabled: true,
    pushEnabled: true,
    smsEnabled: false,
    quietHoursStart: 22,
    quietHoursEnd: 7
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [notifsRes, prefRes] = await Promise.all([
        api.get('/notifications'),
        api.get('/notifications/preferences')
      ]);
      setNotifications(notifsRes.data);
      if (prefRes.data) setPreferences(prefRes.data);
    } catch (err) {
      setNotifications([
        { id: '1', title: '⚠️ Alerte Capteur Température', body: 'Température élevée détectée: 28.4°C sur HVAC Tour Alpha', priority: 'HIGH', read: false, createdAt: new Date().toISOString() },
        { id: '2', title: '📋 Nouvel Ordre de Travail #1042', body: 'Remplacement des filtres HEPA assigné à votre équipe', priority: 'NORMAL', read: true, createdAt: new Date(Date.now() - 3600000).toISOString() }
      ]);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  const handlePrefChange = async (key, value) => {
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    try {
      await api.put('/notifications/preferences', updated);
    } catch (err) {
      // Fallback local state
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-7 h-7 text-indigo-600" />
          Centre de Notifications & Préférences
        </h1>
        <p className="text-slate-500">Gestion du flux de notifications Push, Email & SMS</p>
      </div>

      <PermissionPrompt />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des notifications */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 text-lg mb-4">Notifications récents</h3>
          <div className="space-y-3">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`p-4 rounded-xl border transition flex items-start justify-between ${
                  n.read ? 'bg-slate-50/50 border-slate-200' : 'bg-indigo-50/30 border-indigo-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${n.read ? 'bg-slate-300' : 'bg-indigo-600'}`} />
                    <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      n.priority === 'URGENT' || n.priority === 'HIGH'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {n.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{n.body}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">
                    {new Date(n.createdAt).toLocaleDateString('fr-FR')} {new Date(n.createdAt).toLocaleTimeString('fr-FR')}
                  </p>
                </div>
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 transition"
                    title="Marquer comme lu"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Préférences & Heures de silence */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" /> Préférences d'alerte
          </h3>

          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <p className="text-xs font-bold text-slate-700 uppercase mb-2">Canaux</p>
              {[
                { key: 'pushEnabled', label: 'Notifications Web Push' },
                { key: 'emailEnabled', label: 'Alertes par Email' },
                { key: 'smsEnabled', label: 'SMS d\'urgence' }
              ].map(item => (
                <label key={item.key} className="flex items-center justify-between text-xs text-slate-700 py-1 cursor-pointer">
                  <span>{item.label}</span>
                  <input
                    type="checkbox"
                    checked={preferences[item.key] || false}
                    onChange={(e) => handlePrefChange(item.key, e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                </label>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 uppercase mb-2">Types d'alertes</p>
              {[
                { key: 'workOrderAssigned', label: 'Ordre de travail assigné' },
                { key: 'assetAlerts', label: 'Alertes Équipements' },
                { key: 'sensorAlerts', label: 'Seuils Capteurs dépassés' },
                { key: 'inventoryLow', label: 'Stock bas de pièces' }
              ].map(item => (
                <label key={item.key} className="flex items-center justify-between text-xs text-slate-700 py-1 cursor-pointer">
                  <span>{item.label}</span>
                  <input
                    type="checkbox"
                    checked={preferences[item.key] || false}
                    onChange={(e) => handlePrefChange(item.key, e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                </label>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Heures de Silence
              </p>
              <div className="flex gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">Début (ex: 22h)</label>
                  <input
                    type="number"
                    value={preferences.quietHoursStart || 22}
                    onChange={(e) => handlePrefChange('quietHoursStart', parseInt(e.target.value))}
                    className="w-full text-xs p-1.5 border rounded"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Fin (ex: 7h)</label>
                  <input
                    type="number"
                    value={preferences.quietHoursEnd || 7}
                    onChange={(e) => handlePrefChange('quietHoursEnd', parseInt(e.target.value))}
                    className="w-full text-xs p-1.5 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
