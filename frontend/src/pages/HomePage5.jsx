import React from 'react';

export default function HomePage5() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Sécurité Réseau</h1>
            <p className="text-slate-400 text-sm mt-1">Analyse des flux entrants et pare-feu actif</p>
          </div>
          <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold rounded-full">Option Visuelle 5</span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">Requêtes Bloquées Récemment</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm bg-slate-950 p-4 border border-slate-900 rounded-xl">
                <span className="font-mono text-red-400">192.168.1.105</span>
                <span className="text-slate-400">Tentative Brute-force SSH</span>
                <span className="text-slate-500">Il y a 3 min</span>
              </div>
              <div className="flex justify-between items-center text-sm bg-slate-950 p-4 border border-slate-900 rounded-xl">
                <span className="font-mono text-red-400">85.24.90.12</span>
                <span className="text-slate-400">Scan de Ports Détecté</span>
                <span className="text-slate-500">Il y a 12 min</span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-4">Règles de filtrage</h3>
              <p className="text-slate-400 text-sm mb-6">Toutes les règles par défaut sont configurées en mode strict Zero-Trust.</p>
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                <span className="text-lg">🛡️</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Mode Défensif Activé</h4>
                  <p className="text-xs text-slate-400">Aucun port externe non identifié n'est ouvert sur le WAN.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
