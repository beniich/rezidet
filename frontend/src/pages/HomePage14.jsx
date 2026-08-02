import React from 'react';

export default function HomePage14() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Ascenseurs</h1>
            <p className="text-slate-400 text-sm mt-1">Supervision de la cabine et des étages</p>
          </div>
          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-semibold rounded-full">Option Visuelle 14</span>
        </header>

        <div className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Cabine Principale A</h3>
            <p className="text-slate-400 text-sm mt-1">Étage Actuel: RDC | Direction: Statique</p>
          </div>
          <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold rounded-xl">
            En Service
          </div>
        </div>
      </div>
    </div>
  );
}
