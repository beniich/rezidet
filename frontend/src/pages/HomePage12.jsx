import React from 'react';

export default function HomePage12() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Flux Caméras</h1>
            <p className="text-slate-400 text-sm mt-1">Supervision vidéo en temps réel des zones sensibles</p>
          </div>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">Option Visuelle 12</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <h4 className="text-sm font-bold mb-2">Caméra 01 — Accueil</h4>
            <div className="h-48 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-xs font-mono">
              [ FLUX EN DIRECT — ACCUEIL RDC ]
            </div>
          </div>

          <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <h4 className="text-sm font-bold mb-2">Caméra 02 — Local Serveurs</h4>
            <div className="h-48 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-xs font-mono">
              [ FLUX EN DIRECT — SERVEURS ]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
