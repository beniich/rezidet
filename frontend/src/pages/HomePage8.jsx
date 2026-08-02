import React from 'react';

export default function HomePage8() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Fluides & Vannes</h1>
            <p className="text-slate-400 text-sm mt-1">Supervision de la distribution d'eau</p>
          </div>
          <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold rounded-full">Option Visuelle 8</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Débit Courant</span>
            <div className="text-3xl font-extrabold mt-2 text-white">12.4 L/min</div>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Consommation du Jour</span>
            <div className="text-3xl font-extrabold mt-2 text-white">280 L</div>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Vanne Principale</span>
            <div className="text-3xl font-extrabold mt-2 text-emerald-400">Ouverte</div>
          </div>
        </div>
      </div>
    </div>
  );
}
