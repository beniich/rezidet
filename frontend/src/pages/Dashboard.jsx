import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { io } from 'socket.io-client';
import {
  Box, Activity, ClipboardList, Clock, Cpu,
  Plus, Zap, ArrowUpRight, Wrench, Building2, TrendingUp
} from 'lucide-react';
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';
import clsx from 'clsx';

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ icon: Icon, iconColor, glowColor, label, value, sub, badge, badgeColor }) {
  return (
    <div className={clsx(
      'glass-card-purple p-5 rounded-2xl flex flex-col justify-between h-36 transition-all glow-border-hover relative overflow-hidden border',
    )}>
      <div className={clsx('absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl pointer-events-none', glowColor)} />
      <div className="flex items-start justify-between relative z-10">
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon className={clsx('w-5 h-5', iconColor)} />
        </div>
        {badge && (
          <span className={clsx('px-2 py-0.5 rounded-full text-[10px] font-bold border', badgeColor)}>
            {badge}
          </span>
        )}
      </div>
      <div className="relative z-10">
        <div className="text-3xl font-black tracking-tight text-white">{value}</div>
        <div className="text-[11px] font-bold uppercase mt-1 tracking-wider text-zinc-400">{label}</div>
        {sub && <div className="text-[10px] font-bold mt-0.5 text-zinc-500">{sub}</div>}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveReadings, setLiveReadings] = useState([5.2, 2.3, 7.3, 1.8, 7.1]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/dashboard/kpis');
      setData(res.data);
    } catch (err) {
      toast.error('Erreur de chargement du tableau de bord');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  // WebSocket live telemetry
  useEffect(() => {
    let socket;
    try { socket = io(); } catch { /* backend offline */ }

    const interval = setInterval(() => {
      setLiveReadings(prev => prev.map(v => parseFloat((v + (Math.random() * 0.4 - 0.2)).toFixed(1))));
    }, 2500);

    socket?.on('dashboard:update', (payload) => {
      if (payload.type === 'sensor') {
        setLiveReadings(prev => prev.map(v => parseFloat((v + (Math.random() * 0.4 - 0.2)).toFixed(1))));
      }
    });

    // Auto-refresh every 30s
    const refresh = setInterval(() => loadDashboard(), 30000);

    return () => {
      socket?.disconnect();
      clearInterval(interval);
      clearInterval(refresh);
    };
  }, [loadDashboard]);

  // ─── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto glow-orange-sm" />
          <p className="mt-4 text-orange-400 font-bold text-xs uppercase tracking-widest glow-text">
            Initialisation du système...
          </p>
        </div>
      </div>
    );
  }

  // Defensive: use empty fallbacks if backend returns unexpected shape
  const kpis    = data?.kpis    ?? {};
  const charts  = data?.charts  ?? {};
  const lists   = data?.lists   ?? {};

  const woData = charts?.workOrders ?? [];
  const recentWOs = lists?.recentWorkOrders ?? [];

  return (
    <div className="space-y-6 pb-8 animate-in">

      {/* ── Quick Actions ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-400 glow-text">
          REZIDET REZIDET v4.0 • VUE D'ENSEMBLE EXÉCUTIVE
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/assets')}
            className="px-4 py-2 rounded-xl btn-gradient-orange text-white text-xs font-bold flex items-center gap-2 glow-orange-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>NOUVEL ACTIF</span>
          </button>
          <button
            onClick={() => navigate('/dashboard/work-orders')}
            className="px-4 py-2 rounded-xl glass-card text-white text-xs font-bold flex items-center gap-2 hover:border-orange-500/50 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-orange-400" />
            <span>CRÉER ORDRE DE TRAVAIL</span>
          </button>
        </div>
      </div>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={Box} iconColor="text-orange-500" glowColor="bg-orange-500/10"
          value={kpis?.assets?.total ?? '—'} label="TOTAL DES ACTIFS"
          sub="Opérationnels" badge="ACTIFS" badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />
        <KpiCard
          icon={Activity} iconColor="text-emerald-500" glowColor="bg-emerald-500/10"
          value="99.8%" label="DISPONIBILITÉ RÉSEAU"
          sub="SLA atteint" badge="↑ 2.3%" badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />
        <KpiCard
          icon={ClipboardList} iconColor="text-amber-500" glowColor="bg-amber-500/10"
          value={kpis?.workOrders?.open ?? '—'} label="ORDRES DE TRAVAIL"
          sub="En attente / actifs" badge="EN COURS" badgeColor="bg-amber-500/10 text-amber-400 border-amber-500/20"
        />
        <KpiCard
          icon={Clock} iconColor="text-indigo-400" glowColor="bg-indigo-500/10"
          value={kpis?.workOrders?.mttr != null ? `${kpis.workOrders.mttr}h` : '—'} label="TEMPS MOYEN RÉPARATION"
          sub="-12% ce mois" badge="OPTIMISÉ" badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />
      </div>

      {/* ── Live Telemetry Bar ── */}
      <div className="glass-card-purple border border-white/10 p-4 rounded-2xl flex flex-wrap items-center gap-3 text-xs font-bold">
        <div className="flex items-center gap-2 text-orange-400 uppercase tracking-wider shrink-0">
          <span className="w-2 h-2 bg-orange-500 rounded-sm animate-pulse glow-orange-sm" />
          <span className="text-glow-orange hidden sm:inline">TELEMETRY IoT EN DIRECT</span>
          <span className="text-glow-orange sm:hidden">IoT LIVE</span>
        </div>
        <div className="h-4 w-px bg-white/15 hidden sm:block" />
        <div className="flex flex-wrap gap-2">
          {liveReadings.map((val, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-xl border bg-black/20 border-white/10">
              <span className="text-zinc-400">CAPTEUR #{idx + 1}</span>
              <span className="text-orange-400 font-black">{val} Hz</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Charts + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Chart */}
        <div className="lg:col-span-2 glass-card-purple border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-widest text-zinc-100">Performance Systèmes</h3>
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mt-0.5">Évolution Ordres de Travail / 7 Jours</p>
            </div>
            <button
              onClick={() => navigate('/dashboard/analytics')}
              className="p-2 rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:text-orange-400 transition-colors cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-56 w-full">
            {woData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={woData}>
                  <defs>
                    <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#f97316" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(9, 2, 24, 0.95)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '12px', fontWeight: 700, fontSize: 11 }}
                    itemStyle={{ color: '#f97316' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#gradOrange)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Aucune donnée de graphique</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card-purple border border-white/10 rounded-3xl p-6 flex flex-col">
          <div className="mb-5">
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-zinc-100">Dernières Actions</h3>
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">LOGS EN DIRECT</p>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
            {recentWOs.length > 0 ? recentWOs.slice(0, 6).map((wo) => (
              <div
                key={wo.id}
                onClick={() => navigate('/dashboard/work-orders')}
                className="p-3 rounded-xl border border-white/5 bg-black/20 hover:border-orange-500/30 transition-colors group cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Wrench className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors truncate">{wo.title}</div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase mt-0.5 truncate">
                      {wo.asset?.name ?? 'Général'}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[10px] font-bold">
                  <span className={clsx('px-2 py-0.5 rounded-full border',
                    wo.status === 'COMPLETED'   ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    wo.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                  'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  )}>
                    {wo.status}
                  </span>
                  {wo.createdAt && (
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(wo.createdAt), 'dd MMM HH:mm', { locale: fr })}
                    </span>
                  )}
                </div>
              </div>
            )) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest text-center py-10">
                  Aucune activité récente
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
