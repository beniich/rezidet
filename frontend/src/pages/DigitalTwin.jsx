import { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Box, Activity, Play, Camera, Flame, Zap, Wrench,
  Users, AlertTriangle, Layers
} from 'lucide-react';
import BuildingViewer from '../components/3d/BuildingViewer';

const SCENARIOS = [
  { id: 'fire', name: 'Incendie', icon: Flame, color: 'red', desc: 'Évacuation et intervention urgence' },
  { id: 'evacuation', name: 'Évacuation global', icon: Users, color: 'orange', desc: 'Plan d\'évacuation par étage' },
  { id: 'energy_optim', name: 'Optimisation énergie', icon: Zap, color: 'yellow', desc: 'Réduction consommation HVAC' },
  { id: 'maintenance', name: 'Impact Maintenance', icon: Wrench, color: 'blue', desc: 'Simulation d\'arrêt équipement' }
];

export default function DigitalTwin() {
  const [overview, setOverview] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [scenario, setScenario] = useState(null);
  const [simulationResult, setSimulationResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [twinId] = useState('demo-twin-id');

  useEffect(() => {
    loadOverview();
  }, []);

  const loadOverview = async () => {
    try {
      const { data } = await api.get('/digitaltwin/overview/main-building');
      setOverview(data);
    } catch (err) {
      setOverview({
        building: { name: 'Tour Horizon Alpha', floors: 5, totalArea: 15000 },
        stats: {
          totalAssets: 48,
          operationalAssets: 44,
          totalSpaces: 120,
          occupiedSpaces: 89,
          totalSensors: 28,
          avgHealth: 89
        },
        floors: Array.from({ length: 5 }, (_, i) => ({
          number: i + 1,
          spaces: Array.from({ length: 8 }, (_, j) => ({
            id: `${i + 1}-${j}`,
            name: `Espace E${i + 1}.${j + 1}`,
            status: j % 2 === 0 ? 'occupied' : 'available',
            type: j < 2 ? 'Salle Réunion' : 'Bureau',
            temperature: 20 + Math.random() * 3,
            occupancy: Math.floor(Math.random() * 8)
          })),
          assets: Array.from({ length: 3 }, (_, j) => ({
            id: `asset-${i}-${j}`,
            name: `HVAC-R${i + 1}.${j + 1}`,
            status: 'OPERATIONAL',
            health: 75 + Math.floor(Math.random() * 25)
          }))
        }))
      });
    }
  };

  const runSimulation = async (sc) => {
    setRunning(true);
    setScenario(sc);

    try {
      const { data } = await api.post(`/digitaltwin/${twinId}/simulate`, {
        scenario: sc.id,
        parameters: { occupancy: 150 }
      });
      setSimulationResult(typeof data.results === 'string' ? JSON.parse(data.results) : data.results);
    } catch (err) {
      const fallbackResults = {
        fire: {
          evacuationTime: '7.8 minutes',
          peopleAtRisk: 64,
          affectedZones: ['Zone A1', 'Zone A2'],
          safeExits: 4,
          recommendations: [
            'Déclencher l\'alarme de secteur B',
            'Ouvrir automatiquement les sas de secours Nord',
            'Déployer l\'équipe de sécurité niveau 2'
          ]
        },
        evacuation: {
          evacuationTime: '5.2 minutes',
          bottleneck: 'Escalier principal B',
          timeToClear: '6.5 minutes',
          optimalPath: ['Sortie de secours Est', 'Porte Principale']
        },
        energy_optim: {
          currentConsumption: '8500 kWh',
          optimizedConsumption: '6800 kWh',
          savingsPercent: '20%',
          recommendations: [
            'Ajuster la température de consigne HVAC à 21°C',
            'Activer la régulation d\'éclairage adaptative',
            'Couper la ventilation des salles inoccupées après 19h'
          ]
        },
        maintenance: {
          downtime: '4 heures',
          affectedAssets: 8,
          costImpact: '3 400 €',
          alternativeSchedule: 'Intervention recommandée Samedi 06h00'
        }
      };

      setTimeout(() => {
        setSimulationResult(fallbackResults[sc.id] || {});
        setRunning(false);
      }, 1200);
      return;
    }
    setRunning(false);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Box className="w-7 h-7 text-indigo-600" />
            Jumeau Numérique (Digital Twin 3D)
          </h1>
          <p className="text-slate-500">{overview?.building?.name} • Visualisation & Moteur de Simulation</p>
        </div>
        <button
          onClick={() => api.post(`/digitaltwin/${twinId}/snapshot`)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition shadow-sm"
        >
          <Camera className="w-4 h-4" /> Capturer Instantané (Snapshot)
        </button>
      </div>

      {overview && (
        <>
          {/* Métriques clés */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Bâtiment</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{overview.building.floors} étages</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Actifs en service</p>
              <p className="text-xl font-bold text-emerald-600 mt-1">
                {overview.stats.operationalAssets} / {overview.stats.totalAssets}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Occupation Espaces</p>
              <p className="text-xl font-bold text-indigo-600 mt-1">
                {overview.stats.occupiedSpaces} / {overview.stats.totalSpaces}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Capteurs IoT</p>
              <p className="text-xl font-bold text-purple-600 mt-1">{overview.stats.totalSensors}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Santé Globale</p>
              <p className="text-xl font-bold text-emerald-600 mt-1">{Math.round(overview.stats.avgHealth)}%</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Superficie Total</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{overview.building.totalArea} m²</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualiseur SVG/3D */}
            <div className="lg:col-span-2">
              <BuildingViewer
                buildingName={overview.building.name}
                floors={overview.floors}
                selectedFloor={selectedFloor}
                onSelectFloor={setSelectedFloor}
              />
            </div>

            {/* Panneau de Simulation */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Play className="w-4 h-4 text-indigo-600" /> Lancer une Simulation
                </h3>
                <div className="space-y-3">
                  {SCENARIOS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => runSimulation(s)}
                      disabled={running}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition text-left ${
                        scenario?.id === s.id
                          ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-100">
                        <s.icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-slate-900">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {running && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600" />
                  <span className="text-sm font-medium text-slate-700">Calcul des algorithmes de simulation...</span>
                </div>
              )}

              {simulationResult && !running && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" /> Résultats de Simulation
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(simulationResult).map(([key, val]) => {
                      if (key === 'recommendations') return null;
                      return (
                        <div key={key} className="flex justify-between text-xs py-1 border-b border-slate-100">
                          <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-bold text-slate-900">{Array.isArray(val) ? val.join(', ') : val}</span>
                        </div>
                      );
                    })}
                    {simulationResult.recommendations && (
                      <div className="mt-3 pt-2">
                        <p className="text-xs font-bold text-slate-800 mb-2">Recommandations :</p>
                        <ul className="space-y-1">
                          {simulationResult.recommendations.map((r, i) => (
                            <li key={i} className="text-xs text-slate-600 flex gap-1.5">
                              <span className="text-indigo-600 font-bold">•</span> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
