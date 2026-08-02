import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { io } from 'socket.io-client';
import {
  Package, ClipboardList, AlertTriangle, TrendingUp, MapPin,
  Zap, DollarSign, Activity, Building2, Wrench, Users, Leaf,
  ArrowUp, ArrowDown, RefreshCw, Bell, ChevronRight
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import clsx from 'clsx';
import toast from 'react-hot-toast';

// ============== COMPOSANT : CARTE KPI ==============
const StatCard = ({ icon: Icon, label, value, sub, color = 'zinc', trend, suffix = '' }) => {
  return (
    <div className="bg-surface rounded-none p-5 border border-zinc-800 hover:border-zinc-600 transition-colors duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Icon className="w-4 h-4 text-zinc-300" />
        </div>
        {trend !== undefined && trend !== null && (
          <span className={clsx(
            'flex items-center gap-0.5 text-[10px] font-mono tracking-widest px-1.5 py-0.5 border',
            trend > 0 ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'
          )}>
            {trend > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-zinc-50 font-display tracking-tight">{value}{suffix}</p>
      <p className="text-xs text-zinc-400 mt-1 uppercase tracking-[0.1em] font-medium">{label}</p>
      {sub && <p className="text-[10px] text-zinc-500 mt-2 font-mono uppercase tracking-wider">{sub}</p>}
    </div>
  );
};

// ============== COMPOSANT : SECTION HEADER ==============
const SectionHeader = ({ title, action, onAction }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-semibold text-zinc-50 tracking-[0.1em] uppercase text-xs">{title}</h3>
    {action && (
      <button
        onClick={onAction}
        className="text-[10px] text-zinc-400 hover:text-zinc-50 font-mono tracking-widest uppercase flex items-center gap-1 transition-colors"
      >
        {action} <ChevronRight className="w-3 h-3" />
      </button>
    )}
  </div>
);

// ============== COMPOSANT : CARTE LISTE ==============
const ListCard = ({ title, items, renderItem, emptyMessage, action, onAction }) => (
  <div className="bg-surface border border-zinc-800 flex flex-col h-full">
    <div className="p-5 border-b border-zinc-800 shrink-0">
      <SectionHeader title={title} action={action} onAction={onAction} />
    </div>
    <div className="divide-y divide-zinc-800/50 flex-1 overflow-y-auto min-h-[300px]">
      {items.length === 0 ? (
        <p className="p-6 text-center text-zinc-600 text-xs font-mono tracking-widest uppercase">{emptyMessage}</p>
      ) : (
        items.map(renderItem)
      )}
    </div>
  </div>
);

// ============== COMPOSANT PRINCIPAL ==============
export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [liveReadings, setLiveReadings] = useState([]);

  // ============== CHARGEMENT INITIAL ==============
  const loadDashboard = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const { data } = await api.get('/dashboard/kpis');
      setData(data);
      setLastUpdate(new Date());
    } catch (err) {
      toast.error('Erreur de chargement du tableau de bord');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // ============== WEBSOCKET - TEMPS RÉEL ==============
  useEffect(() => {
    const socket = io();
    
    socket.on('dashboard:update', (payload) => {
      if (payload.type === 'sensor') {
        setLiveReadings((prev) => {
          const filtered = prev.filter(r => r.sensorId !== payload.data.sensorId);
          return [payload.data, ...filtered].slice(0, 5);
        });
        setLastUpdate(new Date());
      }
    });

    return () => socket.disconnect();
  }, []);

  // ============== AUTO-REFRESH (30s) ==============
  useEffect(() => {
    const interval = setInterval(() => loadDashboard(false), 30000);
    return () => clearInterval(interval);
  }, [loadDashboard]);

  // ============== RENDU : LOADING ==============
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-none h-12 w-12 border-2 border-zinc-800 border-t-zinc-50 mx-auto" />
          <p className="mt-4 text-zinc-500 font-mono text-xs uppercase tracking-widest">Initialisation...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { kpis, charts, lists } = data;

  // Adapt charts data for dark theme
  const darkAssetStatus = charts.assetStatus.map(item => {
    let color = '#a1a1aa'; // default zinc
    if (item.name === 'Opérationnel') color = '#10b981'; // green
    if (item.name === 'En maintenance') color = '#f59e0b'; // orange
    if (item.name === 'En panne') color = '#ef4444'; // red
    if (item.name === 'Retiré') color = '#52525b'; // zinc-600
    return { ...item, color };
  });

  // ============== RENDU PRINCIPAL ==============
  return (
    <div className="p-8 bg-background min-h-full font-sans">
      {/* ============== EN-TÊTE ============== */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-50 font-display tracking-widest uppercase">Overview</h1>
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest flex items-center gap-2 mt-2">
            <span className="w-2 h-2 bg-green-500 rounded-none animate-pulse" />
            Sync: {format(lastUpdate, 'HH:mm:ss', { locale: fr })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setRefreshing(true); loadDashboard(false); }}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-50 text-zinc-400 text-xs font-mono uppercase tracking-widest transition-colors"
          >
            <RefreshCw className={clsx('w-3 h-3', refreshing && 'animate-spin')} />
            Refresh
          </button>
          <button className="relative p-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-50 transition-colors">
            <Bell className="w-4 h-4" />
            {kpis.criticalWorkOrders > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-zinc-50 text-[10px] flex items-center justify-center font-mono">
                {kpis.criticalWorkOrders}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ============== KPI CARDS ============== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Package}
          label="Total des actifs"
          value={kpis.totalAssets}
          sub={`${kpis.operationalAssets} OK • ${kpis.maintenanceAssets} MAINT`}
        />
        <StatCard
          icon={Activity}
          label="Disponibilité"
          value={kpis.assetAvailability}
          suffix="%"
          sub={`${kpis.breakdownAssets} PANNE`}
          trend={2.3}
        />
        <StatCard
          icon={ClipboardList}
          label="Ordres en attente"
          value={kpis.pendingWorkOrders + kpis.inProgressWorkOrders}
          sub={`${kpis.criticalWorkOrders} CRIT • ${kpis.completedThisMonth} COMPL`}
        />
        <StatCard
          icon={MapPin}
          label="Taux d'occupation"
          value={kpis.occupancyRate}
          suffix="%"
          sub={`${kpis.occupiedSpaces}/${kpis.totalSpaces} ESPACES`}
          trend={1.8}
        />
        <StatCard
          icon={DollarSign}
          label="Coût maintenance"
          value={(kpis.monthlyMaintenanceCost / 1000).toFixed(1)}
          suffix="k"
          sub={`CUMUL: ${(kpis.totalMaintenanceCost / 1000).toFixed(0)}k`}
        />
        <StatCard
          icon={TrendingUp}
          label="Économies"
          value={kpis.savingsRate}
          suffix="%"
          sub="VS ANNÉE PRÉC."
          trend={kpis.savingsRate}
        />
        <StatCard
          icon={Building2}
          label="Revenus locatifs"
          value={(kpis.monthlyRevenue / 1000).toFixed(1)}
          suffix="k"
          sub={`${kpis.activeLeases} BAUX ACTIFS`}
        />
        <StatCard
          icon={Leaf}
          label="Capteurs actifs"
          value={kpis.activeSensors}
          sub={`${kpis.totalSensors} TOTAL • IoT LIVE`}
        />
      </div>

      {/* ============== LECTURES IoT LIVE ============== */}
      {liveReadings.length > 0 && (
        <div className="bg-zinc-900 p-4 border border-zinc-800 mb-8 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 bg-green-500 rounded-none animate-pulse" />
            <h3 className="font-semibold text-zinc-50 text-[10px] tracking-widest uppercase font-mono">Telemetry</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {liveReadings.map((r) => (
              <div key={r.sensorId} className="bg-background border border-zinc-800 px-3 py-1.5 text-[10px] font-mono flex items-center gap-2">
                <span className="text-zinc-500 uppercase">{r.type}</span>
                <span className="text-zinc-50">
                  {typeof r.value === 'number' ? r.value.toFixed(1) : r.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============== GRAPHIQUES PRINCIPAUX ============== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Tendance Work Orders */}
        <div className="lg:col-span-2 bg-surface p-6 border border-zinc-800">
          <SectionHeader title="Activité des ordres de travail (7J)" />
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={charts.woTrend}>
              <defs>
                <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4d4d8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#d4d4d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="day" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'monospace', textTransform: 'uppercase'}} />
              <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'monospace'}} />
              <Tooltip
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: 0, color: '#f4f4f5', fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase' }}
                itemStyle={{ color: '#f4f4f5' }}
              />
              <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', color: '#a1a1aa' }} />
              <Area
                type="step"
                dataKey="created"
                name="Créés"
                stroke="#d4d4d8"
                fill="url(#colorCreated)"
                strokeWidth={1}
              />
              <Area
                type="step"
                dataKey="completed"
                name="Complétés"
                stroke="#22c55e"
                fill="url(#colorCompleted)"
                strokeWidth={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Statut des actifs */}
        <div className="bg-surface p-6 border border-zinc-800">
          <SectionHeader title="Statut des actifs" />
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={darkAssetStatus}
                cx="50%" cy="50%"
                innerRadius={70} outerRadius={100}
                paddingAngle={2} dataKey="value"
                stroke="none"
              >
                {darkAssetStatus.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: 0, color: '#f4f4f5', fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase' }} />
              <Legend verticalAlign="bottom" iconType="square" wrapperStyle={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', color: '#a1a1aa' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ============== CONSOMMATION ÉNERGÉTIQUE & COÛTS ============== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface p-6 border border-zinc-800">
          <SectionHeader title="Énergie & Coûts (12M)" action="Détails" />
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={charts.energyConsumption}>
              <defs>
                <linearGradient id="colorElec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a1a1aa" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#a1a1aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'monospace', textTransform: 'uppercase'}} />
              <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'monospace'}} />
              <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: 0, color: '#f4f4f5', fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase' }} />
              <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', color: '#a1a1aa' }} />
              <Area
                type="monotone"
                dataKey="elec"
                name="Électricité (kWh)"
                stroke="#a1a1aa"
                fill="url(#colorElec)"
                strokeWidth={1}
              />
              <Line
                type="monotone"
                dataKey="cost"
                name="Coût (€)"
                stroke="#eab308"
                strokeWidth={1}
                dot={false}
                yAxisId="right"
              />
              <YAxis yAxisId="right" orientation="right" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'monospace'}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface p-6 border border-zinc-800">
          <SectionHeader title="Maintenance / Catégorie" action="Rapport" />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={charts.maintenanceCostsByCategory} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
              <XAxis type="number" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} tick={{fontFamily: 'monospace'}} />
              <YAxis
                dataKey="category"
                type="category"
                stroke="#71717a"
                fontSize={10}
                width={80}
                tickLine={false} axisLine={false}
                tick={{fontFamily: 'monospace', textTransform: 'uppercase'}}
              />
              <Tooltip formatter={(v) => `${v.toLocaleString('fr-FR')} €`} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: 0, color: '#f4f4f5', fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase' }} cursor={{fill: '#27272a', opacity: 0.4}} />
              <Bar dataKey="cost" fill="#d4d4d8" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ============== LISTES D'ACTIVITÉ ============== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Orders récents */}
        <ListCard
          title="Derniers Ordres"
          action="Tous"
          onAction={() => navigate('/work-orders')}
          emptyMessage="Aucun ordre"
          items={lists.recentWorkOrders}
          renderItem={(wo) => {
            const priorityStyles = {
              CRITICAL: 'bg-red-500/10 text-red-400 border-red-500/20',
              HIGH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
              MEDIUM: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
              LOW: 'bg-zinc-800 text-zinc-400 border-zinc-700'
            };
            return (
              <div key={wo.id} className="p-4 hover:bg-zinc-900 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-medium text-zinc-50 text-sm line-clamp-1 font-display">
                    {wo.title}
                  </p>
                  <span className={clsx(
                    'text-[10px] font-mono tracking-widest px-1.5 py-0.5 border shrink-0',
                    priorityStyles[wo.priority]
                  )}>
                    {wo.priority}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  <span>{wo.asset?.name}</span>
                  <span>{wo.assignedTo?.firstName} {wo.assignedTo?.lastName}</span>
                </div>
                <p className="text-[10px] text-zinc-600 mt-1.5 font-mono uppercase">
                  {formatDistanceToNow(new Date(wo.createdAt), { 
                    addSuffix: true, 
                    locale: fr 
                  })}
                </p>
              </div>
            );
          }}
        />

        {/* Maintenances à venir */}
        <ListCard
          title="Prévisionnel (7J)"
          action="Agenda"
          onAction={() => navigate('/cmms')}
          emptyMessage="Rien de prévu"
          items={lists.upcomingMaintenance}
          renderItem={(m) => (
            <div key={m.id} className="p-4 hover:bg-zinc-900 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-zinc-50 text-sm font-display">{m.name}</p>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {format(new Date(m.nextMaintenance), 'dd MMM', { locale: fr })}
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3">{m.location}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-800 h-1">
                  <div
                    className={clsx(
                      'h-1',
                      m.healthScore > 70 ? 'bg-green-500' :
                      m.healthScore > 40 ? 'bg-orange-500' : 'bg-red-500'
                    )}
                    style={{ width: `${m.healthScore}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 w-6 text-right">{m.healthScore}%</span>
              </div>
            </div>
          )}
        />

        {/* Alertes critiques */}
        <ListCard
          title="Alertes"
          action="Voir"
          onAction={() => navigate('/notifications')}
          emptyMessage="0 Alerte"
          items={lists.criticalAlerts}
          renderItem={(a) => (
            <div key={a.id} className="p-4 hover:bg-zinc-900 transition-colors">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-zinc-50 text-sm font-display">{a.name}</p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">
                    {a.building?.name} / {a.location}
                  </p>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-red-500 border border-red-500/20 bg-red-500/10 px-1.5 py-0.5">
                  {a.healthScore}%
                </span>
              </div>
            </div>
          )}
        />
      </div>

      {/* ============== CATÉGORIES D'ACTIFS (détaillé) ============== */}
      <div className="mt-8 bg-surface p-6 border border-zinc-800">
        <SectionHeader title="Répartition par catégorie d'actifs" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {charts.assetsByCategory.map((cat) => (
            <div
              key={cat.category}
              className="p-5 border border-zinc-800 hover:border-zinc-600 transition-colors bg-background"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-zinc-50 font-display">{cat.category}</h4>
                <Wrench className="w-4 h-4 text-zinc-600" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1">Quantité</p>
                  <p className="font-medium text-zinc-50">{cat.count}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1">Santé moy.</p>
                  <p className="font-medium text-zinc-50">{cat.avgHealth}%</p>
                </div>
              </div>
              <div className="w-full bg-zinc-800 h-1">
                <div
                  className={clsx(
                    'h-1',
                    cat.avgHealth > 70 ? 'bg-green-500' :
                    cat.avgHealth > 40 ? 'bg-orange-500' : 'bg-red-500'
                  )}
                  style={{ width: `${cat.avgHealth}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
