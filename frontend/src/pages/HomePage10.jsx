import React from 'react';
import useSystems from '../hooks/useSystems';

export default function HomePage10() {
  const { data, loading } = useSystems('electrical');

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Réseau Électrique</h1>
            <p className="text-slate-400 text-sm mt-1">Analyse des flux de puissance et consommation</p>
          </div>
          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-semibold rounded-full">Option Visuelle 10</span>
        </header>

        {loading ? (
          <div className="text-slate-400">Chargement des flux énergétiques...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
              <span className="text-slate-500 text-xs font-bold uppercase">Puissance Active</span>
              <div className="text-3xl font-extrabold mt-2 text-white">
                {data?.activePower || 4.8} kW
              </div>
            </div>
            <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
              <span className="text-slate-500 text-xs font-bold uppercase">Index de Consommation</span>
              <div className="text-3xl font-extrabold mt-2 text-white">
                {data?.dailyConsumption || 12.4} kWh
              </div>
            </div>
            <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
              <span className="text-slate-500 text-xs font-bold uppercase">Tension Phase 1</span>
              <div className="text-3xl font-extrabold mt-2 text-emerald-400">
                {data?.voltage || 232} V
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
