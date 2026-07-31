import { useEffect, useState } from 'react';
import {
  BarChart3, TrendingUp, Leaf, DollarSign, Zap, ThermometerSun
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';

const energyData = [
  { month: 'Jan', elec: 8500, gas: 3200, water: 220, cost: 1450 },
  { month: 'Fév', elec: 8200, gas: 3400, water: 210, cost: 1420 },
  { month: 'Mar', elec: 7800, gas: 2800, water: 230, cost: 1320 },
  { month: 'Avr', elec: 7200, gas: 2200, water: 240, cost: 1180 },
  { month: 'Mai', elec: 6800, gas: 1500, water: 280, cost: 1080 },
  { month: 'Jun', elec: 7500, gas: 800, water: 310, cost: 1090 },
  { month: 'Jul', elec: 9200, gas: 400, water: 340, cost: 1380 },
  { month: 'Aoû', elec: 9800, gas: 350, water: 360, cost: 1480 },
  { month: 'Sep', elec: 8400, gas: 1200, water: 290, cost: 1320 },
  { month: 'Oct', elec: 7900, gas: 2200, water: 250, cost: 1290 },
  { month: 'Nov', elec: 8100, gas: 3100, water: 220, cost: 1410 },
  { month: 'Déc', elec: 8600, gas: 3600, water: 215, cost: 1520 }
];

const performanceData = [
  { metric: 'Disponibilité', value: 94 },
  { metric: 'Efficacité', value: 87 },
  { metric: 'Conformité', value: 92 },
  { metric: 'Durabilité', value: 78 },
  { metric: 'Satisfaction', value: 88 },
  { metric: 'Coût', value: 82 }
];

const costByCategory = [
  { category: 'HVAC', cost: 45000 },
  { category: 'Électrique', cost: 28000 },
  { category: 'IT', cost: 18000 },
  { category: 'Mobilier', cost: 12000 },
  { category: 'Sécurité', cost: 9000 }
];

export default function Analytics() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Analytique & Rapports</h1>
        <p className="text-slate-500">Performance, durabilité et insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Zap, label: 'Énergie consommée', value: '98.5 MWh', sub: 'Ce mois', color: 'yellow' },
          { icon: Leaf, label: 'CO₂ évité', value: '12.4t', sub: 'vs 2023', color: 'green' },
          { icon: DollarSign, label: 'Économies', value: '€18.2k', sub: '+23% YoY', color: 'blue' },
          { icon: TrendingUp, label: 'ROI CAFM', value: '312%', sub: 'Sur 3 ans', color: 'purple' }
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-200">
            <div className={`w-10 h-10 bg-${s.color}-100 rounded-lg flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 text-${s.color}-600`} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Consommation énergétique annuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={energyData}>
              <defs>
                <linearGradient id="colorElec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="elec" name="Électricité" stroke="#6366f1" fill="url(#colorElec)" />
              <Area type="monotone" dataKey="gas" name="Gaz" stroke="#f59e0b" fill="url(#colorGas)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Indicateurs de performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" fontSize={12} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
              <Radar name="Score" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">Coûts de maintenance par catégorie</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costByCategory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="category" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip formatter={(v) => `${v.toLocaleString('fr-FR')} €`} />
            <Bar dataKey="cost" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
