import React from 'react';
import useIoTSensors from '../hooks/useIoTSensors';

export default function HomePage6() {
  const { sensors, loading } = useIoTSensors();

  const tempSensor = sensors.find(s => s.type === 'temperature') || { value: 21.8, unit: '°C' };
  const humSensor = sensors.find(s => s.type === 'humidity') || { value: 48, unit: '%' };
  const co2Sensor = sensors.find(s => s.type === 'co2') || { value: 420, unit: 'ppm' };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Sovereign Nexus — Capteurs Ambientaux</h1>
            <p className="text-slate-400 text-sm mt-1">Surveillance du climat et de la qualité de l'air</p>
          </div>
          <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold rounded-full">Option Visuelle 6</span>
        </header>

        {loading ? (
          <div className="text-slate-400">Chargement des données climatiques...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-bold uppercase">Température</span>
                <div className="text-3xl font-extrabold mt-2 text-white">
                  {typeof tempSensor.value === 'number' ? tempSensor.value.toFixed(1) : tempSensor.value} {tempSensor.unit}
                </div>
              </div>
              <span className="text-3xl">🌡️</span>
            </div>

            <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-bold uppercase">Humidité</span>
                <div className="text-3xl font-extrabold mt-2 text-white">
                  {typeof humSensor.value === 'number' ? humSensor.value.toFixed(0) : humSensor.value} {humSensor.unit}
                </div>
              </div>
              <span className="text-3xl">💧</span>
            </div>

            <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-bold uppercase">Qualité de l'Air (CO2)</span>
                <div className="text-3xl font-extrabold mt-2 text-emerald-400">
                  {typeof co2Sensor.value === 'number' ? co2Sensor.value.toFixed(0) : co2Sensor.value} {co2Sensor.unit}
                </div>
              </div>
              <span className="text-3xl">🍃</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
