import React from 'react';

export default function HomePage18() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Réservation d'Espaces</h1>
            <p className="text-slate-400 text-sm mt-1">Salles communes et planification</p>
          </div>
          <span className="px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 text-xs font-semibold rounded-full">Option Visuelle 18</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">Espace Coworking</h3>
              <p className="text-xs text-slate-500 mt-1">Occupe: 12 / 15 Personnes</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">Disponible</span>
          </div>

          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">Salle de Conférence</h3>
              <p className="text-xs text-slate-500 mt-1">Réunion de 14h à 16h</p>
            </div>
            <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-full">Occupé</span>
          </div>
        </div>
      </div>
    </div>
  );
}
