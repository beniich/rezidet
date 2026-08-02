import React from 'react';

export default function HomePage9() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — CVC & Chauffage</h1>
            <p className="text-slate-400 text-sm mt-1">Régulation thermique intelligente</p>
          </div>
          <span className="px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold rounded-full">Option Visuelle 9</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">Statut de la Chaudière</h3>
            <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-900 rounded-xl">
              <span>Température de Consigne</span>
              <span className="font-mono text-white font-bold">65 °C</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">Pompe à Chaleur</h3>
            <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-900 rounded-xl">
              <span>COP Actuel</span>
              <span className="font-mono text-emerald-400 font-bold">4.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
