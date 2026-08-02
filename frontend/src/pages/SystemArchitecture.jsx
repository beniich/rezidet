import React from 'react';
import { Link } from 'react-router-dom';

export default function SystemArchitecture() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-violet-900/10 blur-[150px] pointer-events-none" />

      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link to="/landing" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Sovereign Nexus
        </Link>
        <Link to="/landing" className="text-slate-400 hover:text-slate-200 transition text-sm">Retour</Link>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <h1 className="text-4xl font-extrabold text-white mb-4">Architecture Technique de Réseau</h1>
        <p className="text-slate-400 mb-12">Découvrez comment nos nœuds locaux communiquent de manière décentralisée et chiffrée.</p>

        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900">
            <h3 className="text-lg font-bold text-white mb-4">Topologie du Réseau</h3>
            <div className="bg-slate-950 p-6 rounded-lg font-mono text-xs text-indigo-400 border border-slate-900 overflow-x-auto leading-relaxed">
              [ Appareils IoT / Capteurs ] <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| (Chiffrement TLS 1.3)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v<br />
              [ Passerelle Souveraine (Nœud Local) ] &lt;=== P2P ===&gt; [ Autres Nœuds ]<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v (Stockage local sur disque & Sync différée)<br />
              [ Base de Données Sécurisée ]
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-900">
              <h4 className="text-base font-bold text-white mb-2">Chiffrement End-to-End</h4>
              <p className="text-slate-400 text-sm">
                Toutes les clés privées restent à l'intérieur des enclaves sécurisées des passerelles locales (HSM ou puces cryptographiques).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-900">
              <h4 className="text-base font-bold text-white mb-2">Tolérance aux Pannes</h4>
              <p className="text-slate-400 text-sm">
                Si un nœud perd sa connexion internet, il continue à réguler et à enregistrer les logs localement sans interruption de service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
