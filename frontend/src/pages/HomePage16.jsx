import React from 'react';

export default function HomePage16() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Conteneurs Déchets</h1>
            <p className="text-slate-400 text-sm mt-1">Niveaux de remplissage des bacs collecteurs</p>
          </div>
          <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold rounded-full">Option Visuelle 16</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Bac Ordures Ménagères</span>
            <div className="text-3xl font-extrabold mt-2 text-white">45 %</div>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Bac Recyclage (Jaune)</span>
            <div className="text-3xl font-extrabold mt-2 text-white">82 %</div>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Bac Verre</span>
            <div className="text-3xl font-extrabold mt-2 text-white">15 %</div>
          </div>
        </div>
      </div>
    </div>
  );
}
