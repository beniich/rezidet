import React from 'react';

export default function HomePage13() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Centrale Incendie</h1>
            <p className="text-slate-400 text-sm mt-1">Supervision des capteurs de fumée et sprinklers</p>
          </div>
          <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold rounded-full">Option Visuelle 13</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <span className="text-emerald-500 text-xs font-bold uppercase">Détecteur Hall</span>
            <div className="text-2xl font-bold mt-2">Normal (Pas de fumée)</div>
          </div>

          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <span className="text-emerald-500 text-xs font-bold uppercase">Détecteur Cuisines</span>
            <div className="text-2xl font-bold mt-2">Normal (Pas de fumée)</div>
          </div>

          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <span className="text-emerald-500 text-xs font-bold uppercase">Sprinklers</span>
            <div className="text-2xl font-bold mt-2">Armés (Prêts)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
