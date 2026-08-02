import React from 'react';

export default function HomePage3() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Journal Immuable</h1>
            <p className="text-slate-400 text-sm mt-1">Audit trail et registre cryptographique en temps réel</p>
          </div>
          <span className="px-3 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-semibold rounded-full">Option Visuelle 3</span>
        </header>

        <div className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Flux d'événements cryptés</h3>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition">Exporter (.csv)</button>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-900 flex items-center justify-between">
              <span className="text-slate-500">2026-08-02 20:07:15</span>
              <span className="text-blue-400">[AUTHENTIFICATION]</span>
              <span className="text-slate-300">Session utilisateur initialisée avec succès (SHA-256 Signature)</span>
              <span className="text-emerald-400">Vérifié</span>
            </div>
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-900 flex items-center justify-between">
              <span className="text-slate-500">2026-08-02 20:05:42</span>
              <span className="text-amber-500">[IoT SENSOR]</span>
              <span className="text-slate-300">Capteur Température Cuisine - Détection de hausse anormale (26.5°C)</span>
              <span className="text-emerald-400">Vérifié</span>
            </div>
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-900 flex items-center justify-between">
              <span className="text-slate-500">2026-08-02 20:00:01</span>
              <span className="text-violet-400">[SYSTEM]</span>
              <span className="text-slate-300">Sauvegarde automatique de la base de données décentralisée</span>
              <span className="text-emerald-400">Vérifié</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
