import React from 'react';
import { Link } from 'react-router-dom';
import usePublicStats from '../hooks/usePublicStats';

export default function LandingPageNew() {
  const { stats } = usePublicStats();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Navigation */}
      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Sovereign Nexus
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/about" className="text-slate-400 hover:text-slate-200 transition text-sm">Notre Mission</Link>
          <Link to="/pricing" className="text-slate-400 hover:text-slate-200 transition text-sm">Tarifs</Link>
          <Link to="/support" className="text-slate-400 hover:text-slate-200 transition text-sm">Support</Link>
          <Link to="/contact" className="text-slate-400 hover:text-slate-200 transition text-sm">Contact</Link>
          <Link to="/login" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold transition">
            Connexion
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          L'Infrastructure de Sécurité <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Souveraine et Décentralisée
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-6">
          Gérez vos actifs physiques, vos capteurs IoT et l'automatisation de vos bâtiments avec une sécurité absolue sans dépendre de tiers.
        </p>

        {stats && (
          <div className="flex justify-center gap-8 mb-10 text-xs uppercase tracking-wider font-semibold text-slate-500">
            <div>Nœuds Actifs: <span className="text-blue-400">{stats.activeNodes}</span></div>
            <div>Uptime Réseau: <span className="text-emerald-400">{stats.networkUptime}</span></div>
            <div>Charge CPU: <span className="text-violet-400">{stats.cpuLoad}</span></div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/auth/register" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02]">
            Enregistrer un Appareil
          </Link>
          <Link to="/architecture" className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold transition">
            Architecture Technique
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900/60 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 font-bold group-hover:scale-110 transition-transform">
              🔒
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sécurité Absolue</h3>
            <p className="text-slate-400 text-sm">
              Architecture Zero-Trust intégrant des journaux cryptographiques immuables et le contrôle complet de vos clés.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 font-bold group-hover:scale-110 transition-transform">
              🌐
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Multi-Réseaux IoT</h3>
            <p className="text-slate-400 text-sm">
              Connexion instantanée de vos capteurs environnementaux et domotiques via un réseau de communication décentralisé.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-6 font-bold group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Analytique Prédictive</h3>
            <p className="text-slate-400 text-sm">
              Des modèles d'intelligence artificielle locaux pour optimiser vos flux de maintenance et d'efficacité énergétique.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
