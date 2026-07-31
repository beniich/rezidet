import { useEffect, useState } from 'react';
import { MapPin, Users, Maximize2 } from 'lucide-react';

export default function Spaces() {
  const [floor, setFloor] = useState(1);
  
  // Mock data
  const spaces = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `E${floor.toString().padStart(2, '0')}.${(i + 1).toString().padStart(2, '0')}`,
    type: i < 4 ? 'meeting' : i < 20 ? 'office' : 'common',
    capacity: i < 4 ? 8 : 2,
    occupancy: Math.floor(Math.random() * (i < 4 ? 8 : 2) * 0.9),
    area: i < 4 ? 30 : 14,
    status: Math.random() > 0.4 ? 'occupied' : 'available'
  }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Plan des espaces</h1>
          <p className="text-slate-500">Tour Horizon - {spaces.length} espaces sur cet étage</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((f) => (
            <button
              key={f}
              onClick={() => setFloor(f)}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                floor === f ? 'bg-primary-600 text-white' : 'bg-white border border-slate-300'
              }`}
            >
              Étage {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {spaces.map((s) => (
          <div
            key={s.id}
            className={`p-4 rounded-xl border-2 cursor-pointer transition hover:scale-105 ${
              s.status === 'occupied' ? 'border-orange-300 bg-orange-50' : 'border-green-300 bg-green-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700">{s.name}</span>
              <span className={`w-2 h-2 rounded-full ${
                s.status === 'occupied' ? 'bg-orange-500' : 'bg-green-500'
              }`} />
            </div>
            <p className="text-xs text-slate-600 capitalize mb-2">
              {s.type === 'meeting' ? 'Salle réunion' : s.type === 'office' ? 'Bureau' : 'Commun'}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" /> {s.occupancy}/{s.capacity}
              </span>
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3 h-3" /> {s.area}m²
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">Légende</h3>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Occupé</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400" />
            <span>Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
