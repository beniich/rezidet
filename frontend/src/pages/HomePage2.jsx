import React, { useEffect, useState } from 'react';
import { nexusApi } from '../services/nexusApi';

export default function HomePage2() {
  const [topology, setTopology] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopology = async () => {
      try {
        const data = await nexusApi.getNetworkTopology();
        setTopology(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopology();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Cartographie</h1>
            <p className="text-slate-400 text-sm mt-1">Supervision géolocalisée et topologie P2P</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">Option Visuelle 2</span>
        </header>

        {loading ? (
          <div className="text-slate-400">Chargement de la topologie...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-8 bg-slate-900/40 border border-slate-900 rounded-2xl h-[400px] flex flex-col justify-between">
              <h3 className="text-lg font-bold">Carte Interactive des Passerelles</h3>
              <div className="flex-1 bg-slate-950/80 rounded-xl border border-slate-900 my-4 flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
                <span className="font-bold text-white">Connexions P2P Détectées</span>
                {topology?.connections.map((c, i) => (
                  <div key={i} className="text-xs font-mono text-indigo-400">
                    {c.from} ⟷ {c.to} (Signal: {c.strength})
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4">Détails des Passerelles</h3>
                <ul className="space-y-4 text-sm text-slate-400">
                  {topology?.nodes.map((node) => (
                    <li key={node.id} className="flex justify-between border-b border-slate-900 pb-2">
                      <div>
                        <div className="font-semibold text-white">{node.label}</div>
                        <div className="text-xs text-slate-500">{node.ip}</div>
                      </div>
                      <span className={`font-semibold ${node.status === 'online' ? 'text-emerald-400' : 'text-red-500'}`}>
                        {node.status === 'online' ? 'En ligne' : 'Hors ligne'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition">
                Configuration Réseau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
