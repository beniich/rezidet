import React from 'react';

export default function HomePage20() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Sonorisation & Diffusion</h1>
            <p className="text-slate-400 text-sm mt-1">Haut-parleurs IP et diffusion d'alertes audio</p>
          </div>
          <span className="px-3 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-semibold rounded-full">Option Visuelle 20</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">Haut-Parleur Hall d'Entrée</h3>
              <p className="text-xs text-slate-500 mt-1">Volume: 60%</p>
            </div>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition text-slate-300">Couper</button>
          </div>

          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">Haut-Parleur Cafétéria</h3>
              <p className="text-xs text-slate-500 mt-1">Volume: Muet</p>
            </div>
            <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-xs font-semibold rounded-lg transition text-white">Activer</button>
          </div>
        </div>
      </div>
    </div>
  );
}
