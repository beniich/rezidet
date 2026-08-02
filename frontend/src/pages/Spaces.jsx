import { useEffect, useState } from 'react';
import api from '../services/api';
import { MapPin, Users, Maximize2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Spaces() {
  const [spaces, setSpaces] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floor, setFloor] = useState(1);
  const [buildingId, setBuildingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/buildings').then(({ data }) => {
      setBuildings(data);
      if (data[0]) setBuildingId(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!buildingId) return;
    setLoading(true);
    api.get(`/assets/spaces?buildingId=${buildingId}`)
      .then(({ data }) => setSpaces(data))
      .finally(() => setLoading(false));
  }, [buildingId]);

  const totalFloors = Math.max(...spaces.map(s => s.floor), 1);
  const filtered = spaces.filter(s => s.floor === floor);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Plan des espaces</h1>
          <p className="text-slate-500">{spaces.length} espaces</p>
        </div>
        <div className="flex gap-2">
          <select value={buildingId || ''} onChange={e => setBuildingId(e.target.value)} className="px-3 py-2 border rounded">
            {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-1 mb-4 flex-wrap">
        {Array.from({ length: totalFloors }, (_, i) => i + 1).map(f => (
          <button
            key={f}
            onClick={() => setFloor(f)}
            className={`w-10 h-10 rounded-lg text-sm font-medium ${
              floor === f ? 'bg-primary-600 text-white' : 'bg-white border hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Chargement...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map(s => (
            <div
              key={s.id}
              className={`p-4 rounded-xl border-2 ${
                s.status === 'occupied' ? 'border-orange-300 bg-orange-50' : 'border-green-300 bg-green-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold">{s.name}</span>
                <span className={`w-2 h-2 rounded-full ${s.status === 'occupied' ? 'bg-orange-500' : 'bg-green-500'}`} />
              </div>
              <p className="text-xs text-slate-600 capitalize mb-2">
                {s.type === 'meeting' ? 'Réunion' : s.type === 'office' ? 'Bureau' : 'Commun'}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {s.occupancy}/{s.capacity}</span>
                <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" /> {s.area}m²</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
