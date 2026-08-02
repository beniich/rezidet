import React from 'react';

export default function HomePage15() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — VMC & Ventilation</h1>
            <p className="text-slate-400 text-sm mt-1">Supervision de l'extraction d'air et du renouvellement</p>
          </div>
          <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold rounded-full">Option Visuelle 15</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <h3 className="text-lg font-bold mb-2">VMC Zone Nord</h3>
            <p className="text-sm text-slate-400">Vitesse extracteur: 80%</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-cyan-500 h-full w-[80%]" />
            </div>
          </div>

          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <h3 className="text-lg font-bold mb-2">VMC Zone Sud</h3>
            <p className="text-sm text-slate-400">Vitesse extracteur: 45%</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-cyan-500 h-full w-[45%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
