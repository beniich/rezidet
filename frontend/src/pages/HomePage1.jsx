import React from 'react';
import useKPIs from '../hooks/useKPIs';

export default function HomePage1() {
  const { data, loading } = useKPIs();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Version Alpha</h1>
            <p className="text-slate-400 text-sm mt-1">Console de contrôle global des infrastructures</p>
          </div>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold rounded-full">Option Visuelle 1</span>
        </header>

        {loading ? (
          <div className="text-slate-400">Chargement des données...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-2xl">
                <span className="text-slate-500 text-xs font-bold uppercase">Capteurs / Actifs</span>
                <div className="text-3xl font-extrabold mt-2 text-blue-400">
                  {data?.kpis?.activeSensors || 0} / {data?.kpis?.totalSensors || 0}
                </div>
              </div>
              <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-2xl">
                <span className="text-slate-500 text-xs font-bold uppercase">Bâtiments</span>
                <div className="text-3xl font-extrabold mt-2 text-emerald-400">
                  {data?.kpis?.totalBuildings || 0}
                </div>
              </div>
              <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-2xl">
                <span className="text-slate-500 text-xs font-bold uppercase">Alertes Critiques</span>
                <div className="text-3xl font-extrabold mt-2 text-amber-500">
                  {data?.kpis?.criticalWorkOrders || 0}
                </div>
              </div>
              <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-2xl">
                <span className="text-slate-500 text-xs font-bold uppercase">Ordres de Travail</span>
                <div className="text-3xl font-extrabold mt-2 text-violet-400">
                  {data?.kpis?.pendingWorkOrders || 0} en attente
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900/30 border border-slate-900/80 rounded-2xl">
              <h3 className="text-lg font-bold mb-4">Activité Réseau en Temps Réel</h3>
              <div className="h-48 bg-slate-950/80 rounded-xl border border-slate-900 flex items-center justify-center text-slate-400 text-sm">
                Réseau disponible et surveillé localement. {data?.kpis?.assetAvailability || 100}% Uptime de service.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
