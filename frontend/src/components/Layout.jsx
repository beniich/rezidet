import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Package, MapPin,
  ClipboardList, BarChart3, LogOut, Wrench, Box,
  Bell, Globe, Download, Database, Layers, Menu, X,
  FileText, Cpu, Sun, Moon, Settings, CreditCard, ShoppingBag, Store,
  Coins, Vote, Rocket, Activity, Zap, TrendingUp, Target
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useTenantStore } from '../store/tenantStore';
import clsx from 'clsx';
import { PresencePanel, StatusDot } from './PresencePanel';

const navItems = [
  { to: '/dashboard',             icon: LayoutDashboard, label: 'Tableau de bord', end: true },
  { to: '/dashboard/assets',      icon: Package,         label: 'Actifs' },
  { to: '/dashboard/spaces',      icon: MapPin,          label: 'Espaces' },
  { to: '/dashboard/work-orders', icon: ClipboardList,   label: 'Ordres de travail' },
  { to: '/dashboard/maintenance', icon: Wrench,          label: 'Maintenance' },
  { to: '/dashboard/analytics',   icon: BarChart3,       label: 'Analytique' },
  { to: '/dashboard/leases',      icon: FileText,        label: 'Baux' },
];

const advancedItems = [
  { to: '/dashboard/cmms',           icon: Wrench,    label: 'CMMS / GMAO' },
  { to: '/dashboard/digital-twin',   icon: Box,       label: 'Jumeau Numérique' },
  { to: '/dashboard/bim',            icon: Layers,    label: 'Visualiseur BIM' },
  { to: '/dashboard/erp',            icon: Database,  label: 'Intégration ERP' },
  { to: '/dashboard/notifications',  icon: Bell,      label: 'Notifications' },
  { to: '/dashboard/tenants',        icon: Globe,     label: 'Multi-Tenant' },
  { to: '/dashboard/exports',        icon: Download,  label: 'Exports PDF' },
  { to: '/dashboard/ai',             icon: Cpu,       label: 'Assistant IA' },
  { to: '/dashboard/settings',       icon: Settings,  label: 'Paramètres Org.' },
  { to: '/dashboard/billing',        icon: CreditCard, label: 'Facturation' },
  { to: '/dashboard/marketplace',    icon: ShoppingBag, label: 'Marketplace' },
  { to: '/dashboard/vendor',         icon: Store,        label: 'Vendor' },
];

const web3Items = [
  { to: '/dashboard/staking',      icon: Coins,    label: 'Staking CAFM' },
  { to: '/dashboard/dao',          icon: Vote,     label: 'Gouvernance DAO' },
  { to: '/dashboard/launchpad',    icon: Rocket,   label: 'IDO Launchpad' },
  { to: '/dashboard/bridge',       icon: Zap,      label: 'Cross-Chain Bridge' },
  { to: '/dashboard/oracle',       icon: Activity, label: 'Oracle Prices' },
  { to: '/dashboard/perpetuals',   icon: TrendingUp, label: 'Perpetuals Trading' },
  { to: '/dashboard/options',      icon: Target,   label: 'Options Trading' },
];

export default function Layout() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { tenant, loadTenant } = useTenantStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [presenceOpen, setPresenceOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    loadTenant();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  const linkClass = ({ isActive }) =>
    clsx(
      'flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs uppercase tracking-widest font-mono transition-colors',
      isActive
        ? 'bg-zinc-800 text-zinc-50 border-l-2 border-orange-500'
        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
    );

  const orgName = tenant?.name || 'CAFM Pro';
  const orgLogo = tenant?.logo || null;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          {orgLogo ? (
            <img
              src={orgLogo}
              alt={orgName}
              className="w-9 h-9 rounded-lg object-cover border border-zinc-700"
            />
          ) : (
            <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-orange-400" />
            </div>
          )}
          <div>
            <h1 className="font-bold text-zinc-50 font-mono tracking-widest uppercase text-sm leading-tight">
              {orgName}
            </h1>
            <p className="text-[10px] text-orange-400/80 font-mono tracking-widest uppercase">
              Facility Management
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={closeSidebar}>
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}

        <div className="pt-4 pb-1">
          <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-600 px-3">Modules Avancés</p>
        </div>

        {advancedItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass} onClick={closeSidebar}>
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}

        <div className="pt-4 pb-1">
          <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-600 px-3">Web3 & DeFi</p>
        </div>

        {web3Items.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass} onClick={closeSidebar}>
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer: User + Theme Toggle */}
      <div className="p-4 border-t border-zinc-800 space-y-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 border border-zinc-800 rounded-sm transition"
        >
          <span className="flex items-center gap-2">
            {isDark ? <Moon className="w-3.5 h-3.5 text-orange-400" /> : <Sun className="w-3.5 h-3.5 text-orange-400" />}
            {isDark ? 'Mode Sombre' : 'Mode Clair'}
          </span>
          <div className={clsx(
            'w-8 h-4 rounded-full transition-colors relative',
            isDark ? 'bg-orange-500' : 'bg-zinc-600'
          )}>
            <div className={clsx(
              'absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform',
              isDark ? 'translate-x-4' : 'translate-x-0.5'
            )} />
          </div>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 rounded-sm flex items-center justify-center shrink-0">
            <span className="text-xs font-mono font-medium text-zinc-300">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-50 font-mono truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-zinc-500 font-mono tracking-wider truncate">{user?.role}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setPresenceOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 border border-zinc-800 rounded-sm transition"
          >
            <span className="flex items-center gap-2"><StatusDot status="online" size="sm" /> Équipe</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 border border-zinc-800 rounded-sm transition"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background text-zinc-50 font-sans">

      {/* ── Desktop/Tablet sidebar ──────────────────────────────────────────── */}
      <aside className="hidden md:flex w-56 lg:w-64 bg-surface border-r border-zinc-800 flex-col shrink-0 transition-all duration-300">
        <SidebarContent />
      </aside>

      {/* ── Mobile overlay ──────────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile sidebar (drawer) ─────────────────────────────────────────── */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-zinc-800 flex flex-col transition-transform duration-300 md:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-zinc-50"
          aria-label="Fermer le menu"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent />
      </aside>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-surface border-b border-zinc-800 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-zinc-400 hover:text-zinc-50 rounded-sm"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">{orgName}</span>
          <button onClick={toggleTheme} className="p-2 text-zinc-400 hover:text-orange-400 transition-colors">
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-background relative p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <PresencePanel isOpen={presenceOpen} onClose={() => setPresenceOpen(false)} currentUser={user} />
    </div>
  );
}
