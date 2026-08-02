import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nexusApi } from '../services/nexusApi';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await nexusApi.registerDevice({
        email,
        password,
        firstName: deviceName,
        lastName: 'Device',
        role: 'ADMIN'
      });
      alert('Enregistrement réussi de l\'appareil souverain.');
      navigate('/login');
    } catch (err) {
      alert("Erreur lors de l'enregistrement : " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-900/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-900/30 blur-[120px]" />

      <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
            Join Sovereign Nexus
          </h2>
          <p className="text-slate-400 mt-2 text-sm">Enregistrez un nouvel appareil ou nœud de sécurité</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Identifiant Unique de l'Appareil</label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition text-slate-100 placeholder-slate-600"
              placeholder="NEXUS-NODE-001"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Adresse Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition text-slate-100 placeholder-slate-600"
              placeholder="admin@nexus.sovereign"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Clé d'Accès Sécurisée</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition text-slate-100 placeholder-slate-600"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg font-medium text-white transition-all transform active:scale-[0.98] shadow-lg shadow-emerald-500/20"
          >
            {loading ? "Enregistrement en cours..." : "Enregistrer l'appareil"}
          </button>
        </form>
      </div>
    </div>
  );
}
