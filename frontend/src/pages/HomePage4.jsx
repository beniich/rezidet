import React from 'react';

export default function HomePage4() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Performance</h1>
            <p className="text-slate-400 text-sm mt-1">Supervision des ressources matérielles des enclaves</p>
          </div>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold rounded-full">Option Visuelle 4</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl text-center">
            <h4 className="text-slate-400 text-sm font-semibold mb-6">Charge CPU</h4>
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-indigo-600 border-t-slate-800 text-xl font-bold">
              72%
            </div>
            <p className="text-slate-500 text-xs mt-6">Fréquence moyenne 3.4 GHz</p>
          </div>

          <div className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl text-center">
            <h4 className="text-slate-400 text-sm font-semibold mb-6">Utilisation Mémoire</h4>
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-emerald-600 border-t-slate-800 text-xl font-bold">
              45%
            </div>
            <p className="text-slate-500 text-xs mt-6">4.2 Go / 8.0 Go alloués</p>
          </div>

          <div className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl text-center">
            <h4 className="text-slate-400 text-sm font-semibold mb-6">Stockage Disque</h4>
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-violet-600 border-t-slate-800 text-xl font-bold">
              88%
            </div>
            <p className="text-slate-500 text-xs mt-6">210 Go / 240 Go utilisés</p>
          </div>
        </div>
      </div>
    </div>
  );
}
