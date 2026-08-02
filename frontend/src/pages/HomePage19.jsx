import React from 'react';

export default function HomePage19() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Consignes à Colis</h1>
            <p className="text-slate-400 text-sm mt-1">Réception des paquets et boîte aux lettres</p>
          </div>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">Option Visuelle 19</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Casier A1</span>
            <div className="text-2xl font-bold mt-2 text-white">Occupé (Colis en attente)</div>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Casier A2</span>
            <div className="text-2xl font-bold mt-2 text-slate-500">Vide</div>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <span className="text-slate-500 text-xs font-bold uppercase">Boîte aux Lettres</span>
            <div className="text-2xl font-bold mt-2 text-emerald-400">Nouveau Courrier !</div>
          </div>
        </div>
      </div>
    </div>
  );
}
