import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Package, MapPin,
  ClipboardList, BarChart3, LogOut, Wrench, Box,
  Bell, Globe, Download, Database, Layers, Menu, X,
  FileText, Cpu
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import clsx from 'clsx';

const navItems = [
  { to: '/',            icon: LayoutDashboard, label: 'Tableau de bord', end: true },
  { to: '/assets',      icon: Package,         label: 'Actifs' },
  { to: '/spaces',      icon: MapPin,          label: 'Espaces' },
  { to: '/work-orders', icon: ClipboardList,   label: 'Ordres de travail' },
  { to: '/maintenance', icon: Wrench,          label: 'Maintenance' },
  { to: '/analytics',   icon: BarChart3,       label: 'Analytique' },
  { to: '/leases',      icon: FileText,        label: 'Baux' },
];

const advancedItems = [
  { to: '/cmms',           icon: Wrench,    label: 'CMMS / GMAO' },
  { to: '/digital-twin',   icon: Box,       label: 'Jumeau Numérique' },
  { to: '/bim',            icon: Layers,    label: 'Visualiseur BIM' },
  { to: '/erp',            icon: Database,  label: 'Intégration ERP' },
  { to: '/notifications',  icon: Bell,      label: 'Notifications' },
  { to: '/tenants',        icon: Globe,     label: 'Multi-Tenant' },
  { to: '/exports',        icon: Download,  label: 'Exports PDF' },
  { to: '/ai',             icon: Cpu,       label: 'Assistant IA' },
];

const linkClass = ({ isActive }) =>
  clsx(
    'flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs uppercase tracking-widest font-mono transition-colors',
    isActive
      ? 'bg-zinc-800 text-zinc-50 border-l-2 border-cyan-400'
      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
  );

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="font-bold text-zinc-50 font-mono tracking-widest uppercase text-sm">CAFM Pro</h1>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Facility Management</p>
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
      </nav>

      {/* User */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 mb-3">
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
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 border border-zinc-800 rounded-sm transition"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background text-zinc-50 font-sans">

      {/* ── Desktop sidebar ─────────────────────────────────────────────────── */}
      <aside className="hidden md:flex w-64 bg-surface border-r border-zinc-800 flex-col shrink-0">
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
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">CAFM Pro</span>
          <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 rounded-sm flex items-center justify-center">
            <span className="text-xs font-mono text-zinc-300">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
