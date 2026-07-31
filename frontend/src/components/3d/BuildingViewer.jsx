import { useState } from 'react';
import { Layers, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function BuildingViewer({ buildingName, floors = [], selectedFloor, onSelectFloor }) {
  const currentFloorData = floors.find(f => f.number === selectedFloor) || floors[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" /> Plan dynamique 3D/2D - {buildingName} (Étage {selectedFloor})
        </h3>
        <div className="flex gap-1">
          {floors.map(f => (
            <button
              key={f.number}
              onClick={() => onSelectFloor(f.number)}
              className={`w-8 h-8 text-xs font-semibold rounded transition ${
                selectedFloor === f.number
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f.number}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-96 bg-slate-900 p-6 flex items-center justify-center">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Fond bâtiment */}
          <rect x="40" y="40" width="720" height="320" fill="#1e293b" stroke="#334155" strokeWidth="3" rx="12" />
          
          {/* Couloir central */}
          <rect x="40" y="180" width="720" height="40" fill="#0f172a" stroke="#1e293b" />
          <text x="400" y="205" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">
            COULLOIR PRINCIPAL - ÉTAGE {selectedFloor}
          </text>

          {/* Salles / Espaces */}
          {currentFloorData?.spaces?.map((space, i) => {
            const x = 50 + (i % 5) * 140;
            const y = i < 5 ? 50 : 230;
            const isOccupied = space.status === 'occupied';
            return (
              <g key={space.id || i}>
                <rect
                  x={x} y={y}
                  width="125" height="120"
                  fill={isOccupied ? '#7c2d12' : '#064e3b'}
                  stroke={isOccupied ? '#ea580c' : '#10b981'}
                  strokeWidth="2"
                  rx="8"
                  className="cursor-pointer hover:opacity-90 transition"
                />
                <text x={x + 62} y={y + 40} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f8fafc">
                  {space.name}
                </text>
                <text x={x + 62} y={y + 65} textAnchor="middle" fontSize="11" fill="#cbd5e1">
                  {space.type || 'Bureau'}
                </text>
                <text x={x + 62} y={y + 90} textAnchor="middle" fontSize="10" fill={isOccupied ? '#ffedd5' : '#d1fae5'}>
                  {isOccupied ? 'Occupé' : 'Libre'} • {space.temperature ? space.temperature.toFixed(1) : '21.5'}°C
                </text>
              </g>
            );
          })}

          {/* Équipements / Capteurs IoT */}
          {currentFloorData?.assets?.map((asset, i) => (
            <g key={asset.id || i}>
              <circle
                cx={120 + i * 160} cy={200}
                r="9"
                fill={asset.health > 70 ? '#10b981' : asset.health > 40 ? '#f59e0b' : '#ef4444'}
                className="animate-pulse"
              />
              <text x={120 + i * 160} y={180} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f1f5f9">
                {asset.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-3 h-3 bg-emerald-500 rounded-sm" /> Espaces Libres
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-3 h-3 bg-orange-600 rounded-sm" /> Espaces Occupés
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" /> Capteurs IoT Actifs
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Synchro temps réel WebSocket
        </div>
      </div>
    </div>
  );
}
