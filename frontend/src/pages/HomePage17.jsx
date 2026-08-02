import React from 'react';

export default function HomePage17() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Parking & Bornes</h1>
            <p className="text-slate-400 text-sm mt-1">Places disponibles et statut des charges</p>
          </div>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">Option Visuelle 17</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Places Libres</span>
            <div className="text-3xl font-extrabold mt-2 text-white">14 / 20</div>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Borne Charge #1</span>
            <div className="text-3xl font-extrabold mt-2 text-sky-400">En cours (22 kW)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
