import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Package, MapPin,
  ClipboardList, BarChart3, LogOut, Wrench,
  Bell, Globe, Download, Database, Layers, Menu, X,
  FileText, Cpu, Sun, Moon, Settings, CreditCard, ShoppingBag, Store,
  Coins, Vote, Rocket, Activity, Zap, TrendingUp, Target, Key,
  RefreshCw, Eye, ShieldAlert
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useTenantStore } from '../store/tenantStore';
import clsx from 'clsx';
import { PresencePanel, StatusDot } from './PresencePanel';
import RezidetLogo from './RezidetLogo';

// ─── Navigation data ───────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {
    title: 'PRINCIPAL',
    items: [
      { to: '/dashboard',             icon: LayoutDashboard, label: 'Tableau de bord', end: true },
      { to: '/dashboard/assets',      icon: Package,         label: 'Actifs' },
      { to: '/dashboard/spaces',      icon: MapPin,          label: 'Espaces' },
      { to: '/dashboard/work-orders', icon: ClipboardList,   label: 'Ordres de travail' },
      { to: '/dashboard/maintenance', icon: Wrench,          label: 'Maintenance' },
      { to: '/dashboard/analytics',   icon: BarChart3,       label: 'Analytique' },
      { to: '/dashboard/leases',      icon: FileText,        label: 'Baux' },
    ],
  },
  {
    title: 'MODULES AVANCÉS',
    items: [
      { to: '/dashboard/cmms',           icon: Cpu,         label: 'CMMS / GMAO' },
      { to: '/dashboard/digital-twin',   icon: Layers,      label: 'Jumeau Numérique' },
      { to: '/dashboard/bim',            icon: Eye,         label: 'Visualiseur BIM' },
      { to: '/dashboard/erp',            icon: Database,    label: 'Intégration ERP' },
      { to: '/dashboard/notifications',  icon: Bell,        label: 'Notifications' },
      { to: '/dashboard/tenants',        icon: Globe,       label: 'Multi-Tenant' },
      { to: '/dashboard/exports',        icon: Download,    label: 'Exports PDF' },
      { to: '/dashboard/ai',             icon: Cpu,         label: 'Assistant IA' },
      { to: '/dashboard/settings',       icon: Settings,    label: 'Paramètres Org.' },
      { to: '/dashboard/billing',        icon: CreditCard,  label: 'Facturation' },
      { to: '/dashboard/marketplace',    icon: ShoppingBag, label: 'Marketplace' },
      { to: '/dashboard/vendor',         icon: Store,       label: 'Vendor' },
    ],
  },
  {
    title: 'WEB3 & DEFI',
    items: [
      { to: '/dashboard/staking',    icon: Coins,     label: 'Staking REZIDET' },
      { to: '/dashboard/dao',        icon: Vote,      label: 'Gouvernance DAO' },
      { to: '/dashboard/launchpad',  icon: Rocket,    label: 'IDO Launchpad' },
      { to: '/dashboard/bridge',     icon: Zap,       label: 'Cross-Chain Bridge' },
      { to: '/dashboard/oracle',     icon: TrendingUp,label: 'Oracle Prices' },
      { to: '/dashboard/perpetuals', icon: Activity,  label: 'Perpetuals Trading' },
      { to: '/dashboard/options',    icon: Target,    label: 'Options Trading' },
    ],
  },
  {
    title: 'ADMIN',
    items: [
      { to: '/dashboard/admin/licenses', icon: Key, label: 'Licences' },
    ],
  },
];

// ─── Isolated Sidebar component (outside Layout to avoid re-render crashes) ────
function Sidebar({ orgName, orgLogo, user, isDark, toggleTheme, onLogout, onPresence, onClose }) {
  const linkClass = ({ isActive }) =>
    clsx(
      'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all cursor-pointer',
      isActive
        ? 'bg-orange-500/20 text-orange-400 border-l-4 border-orange-500 font-extrabold'
        : 'text-zinc-300 hover:text-white hover:bg-white/5'
    );

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-5 border-b border-white/10 shrink-0">
        <RezidetLogo className="h-10" textClassName="text-2xl" />
        <div className="text-[10px] mt-1 font-bold text-orange-400 tracking-widest uppercase ml-12">FACILITY MANAGEMENT</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-5 overflow-y-auto custom-scrollbar">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1">
            <div className="text-[10px] font-bold text-zinc-500 tracking-wider px-3 uppercase mb-2">
              {section.title}
            </div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
                onClick={onClose}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-3 p-4 border-t border-white/10 shrink-0">
        {/* Theme toggle */}
        <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-black/20 text-zinc-200 text-xs font-bold">
          <div className="flex items-center gap-2 text-[11px]">
            {isDark ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{isDark ? 'MODE SOMBRE' : 'MODE CLAIR'}</span>
          </div>
          <button
            onClick={toggleTheme}
            className={clsx('w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer', isDark ? 'bg-orange-500' : 'bg-zinc-600')}
          >
            <div className={clsx('w-4 h-4 rounded-full bg-white shadow-md transform transition-transform', isDark ? 'translate-x-4' : 'translate-x-0')} />
          </button>
        </div>

        {/* User card */}
        <div className="p-3 rounded-xl border border-white/10 bg-black/20 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg btn-gradient-orange flex items-center justify-center font-bold text-white text-xs shrink-0">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-zinc-100 truncate">{user?.firstName} {user?.lastName}</div>
              <div className="text-[10px] text-orange-400 font-bold tracking-wider uppercase">{user?.role}</div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px]">
            <button
              onClick={onPresence}
              className="flex items-center gap-1 text-emerald-400 font-bold cursor-pointer hover:text-emerald-300 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="ml-0.5">EN LIGNE</span>
            </button>
            <button
              onClick={onLogout}
              className="text-zinc-400 hover:text-rose-400 flex items-center gap-1 font-bold cursor-pointer transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>DÉCONNEXION</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page title map ─────────────────────────────────────────────────────────────
const PAGE_TITLES = {
  '/dashboard': 'OVERVIEW EXÉCUTIF',
  '/dashboard/assets': 'INVENTAIRE DES ACTIFS',
  '/dashboard/spaces': 'GESTION DES ESPACES',
  '/dashboard/work-orders': 'ORDRES DE TRAVAIL (GMAO)',
  '/dashboard/maintenance': 'PLAN DE MAINTENANCE',
  '/dashboard/analytics': 'ANALYTIQUE & PERFORMANCE',
  '/dashboard/leases': 'GESTION DES BAUX',
  '/dashboard/cmms': 'CMMS / GMAO',
  '/dashboard/digital-twin': 'JUMEAU NUMÉRIQUE',
  '/dashboard/bim': 'VISUALISEUR BIM',
  '/dashboard/erp': 'INTÉGRATION ERP',
  '/dashboard/notifications': 'NOTIFICATIONS',
  '/dashboard/tenants': 'MULTI-TENANT',
  '/dashboard/exports': 'EXPORTS PDF',
  '/dashboard/ai': 'ASSISTANT IA',
  '/dashboard/settings': 'PARAMÈTRES ORGANISATION',
  '/dashboard/billing': 'FACTURATION',
  '/dashboard/marketplace': 'MARKETPLACE',
  '/dashboard/vendor': 'VENDOR DASHBOARD',
  '/dashboard/staking': 'STAKING REZIDET',
  '/dashboard/dao': 'GOUVERNANCE DAO',
  '/dashboard/launchpad': 'IDO LAUNCHPAD',
  '/dashboard/bridge': 'CROSS-CHAIN BRIDGE',
  '/dashboard/oracle': 'ORACLE PRICES',
  '/dashboard/perpetuals': 'PERPETUALS TRADING',
  '/dashboard/options': 'OPTIONS TRADING',
  '/dashboard/admin/licenses': 'STOCK LICENCES SUPER ADMIN',
};

// ─── Main Layout ───────────────────────────────────────────────────────────────
export default function Layout() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { tenant, loadTenant } = useTenantStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [presenceOpen, setPresenceOpen] = useState(false);
  const [syncTime, setSyncTime] = useState(new Date().toLocaleTimeString());
  const isDark = theme === 'dark';

  useEffect(() => { loadTenant(); }, []);

  // Live sync clock
  useEffect(() => {
    const t = setInterval(() => setSyncTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };
  const closeSidebar = () => setSidebarOpen(false);

  const orgName = tenant?.name || 'REZIDET';
  const orgLogo = tenant?.logo || null;
  const pageTitle = PAGE_TITLES[location.pathname] || location.pathname.split('/').pop()?.toUpperCase();

  const sidebarProps = {
    orgName, orgLogo, user, isDark, toggleTheme,
    onLogout: handleLogout,
    onPresence: () => setPresenceOpen(true),
    onClose: closeSidebar,
  };

  return (
    <div className="flex h-screen text-zinc-50 font-sans selection:bg-orange-500 selection:text-white overflow-hidden" style={{ background: '#090218' }}>

      {/* ── Animated Cyber Background ── */}
      <div className="fixed inset-0 bg-main-radial opacity-60 pointer-events-none z-0 animate-pulse-glow" />

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-64 lg:w-72 shrink-0 glass-header border-r border-white/10 flex-col relative z-20 shadow-2xl">
        <Sidebar {...sidebarProps} />
      </aside>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" onClick={closeSidebar} aria-hidden="true" />
      )}

      {/* ── Mobile sidebar drawer ── */}
      <aside className={clsx(
        'fixed inset-y-0 left-0 z-50 w-72 glass-header border-r border-white/10 flex flex-col transition-transform duration-300 md:hidden shadow-2xl',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-zinc-400 hover:text-orange-400 transition-all z-10"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
        <Sidebar {...sidebarProps} />
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">

        {/* Top Header Bar */}
        <header className="shrink-0 glass-header border-b border-white/10 px-6 py-3 flex items-center justify-between gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-50 rounded-lg bg-white/5"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page title */}
          <div className="flex-1">
            <h1 className="text-sm md:text-base font-black uppercase tracking-wider text-zinc-100 truncate">
              {pageTitle}
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-sm bg-emerald-500 animate-pulse" />
              <span>SYNC SOCKET.IO: {syncTime}</span>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-xl border border-white/10 bg-black/20 text-zinc-300 hover:text-orange-400 hover:border-orange-500/50 transition-all"
              title="Actualiser"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/dashboard/notifications')}
              className="p-2 rounded-xl border border-white/10 bg-black/20 text-zinc-300 hover:text-orange-400 hover:border-orange-500/50 transition-all relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-white/10 bg-black/20 text-zinc-300 hover:text-orange-400 transition-all hidden md:block"
              title="Thème"
            >
              {isDark ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>

      <PresencePanel isOpen={presenceOpen} onClose={() => setPresenceOpen(false)} currentUser={user} />
    </div>
  );
}
