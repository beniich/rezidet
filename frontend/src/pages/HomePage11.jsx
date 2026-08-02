import React from 'react';

export default function HomePage11() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Contrôle d'Accès</h1>
            <p className="text-slate-400 text-sm mt-1">Surveillance des portes et lecteurs RFID/NFC</p>
          </div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">Option Visuelle 11</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">Porte Entrée Principale</h3>
              <p className="text-xs text-slate-500 mt-1">Statut: Verrouillée</p>
            </div>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition text-slate-300">Déverrouiller</button>
          </div>

          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">Porte Parking</h3>
              <p className="text-xs text-slate-500 mt-1">Statut: Ouverte (Temporisation)</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold rounded-lg transition text-white">Forcer Fermeture</button>
          </div>
        </div>
      </div>
    </div>
  );
}
