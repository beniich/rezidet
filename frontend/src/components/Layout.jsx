import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Package, MapPin,
  ClipboardList, BarChart3, FileText, LogOut,
  Wrench, Box, Bell, Globe, Download, Database, Layers
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import clsx from 'clsx';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/assets', icon: Package, label: 'Actifs' },
  { to: '/spaces', icon: MapPin, label: 'Espaces' },
  { to: '/work-orders', icon: ClipboardList, label: 'Ordres de travail' },
  { to: '/analytics', icon: BarChart3, label: 'Analytique' },
];

const newModules = [
  { to: '/cmms', icon: Wrench, label: 'CMMS / GMAO' },
  { to: '/digital-twin', icon: Box, label: 'Jumeau Numérique' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/tenants', icon: Globe, label: 'Multi-Tenant' },
  { to: '/exports', icon: Download, label: 'Exports PDF' },
  { to: '/erp-integration', icon: Database, label: 'Intégration ERP' },
  { to: '/bim-viewer', icon: Layers, label: 'Visualiseur BIM' },
];

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background text-zinc-50 font-sans">
      <aside className="w-64 bg-surface border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <h1 className="font-bold text-zinc-50 font-display tracking-widest uppercase text-sm">CAFM Pro</h1>
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Facility Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Modules principaux */}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs uppercase tracking-widest font-mono transition-colors',
                  isActive
                    ? 'bg-zinc-800 text-zinc-50 border-l-2 border-zinc-300'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}

          {/* Séparateur nouveaux modules */}
          <div className="pt-3 pb-1">
            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-600 px-3">Modules Avancés</p>
          </div>

          {newModules.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs uppercase tracking-widest font-mono transition-colors',
                  isActive
                    ? 'bg-indigo-900/60 text-indigo-300 border-l-2 border-indigo-500'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 rounded-sm flex items-center justify-center">
              <span className="text-xs font-mono font-medium text-zinc-300">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-50 font-display truncate">
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
      </aside>

      <main className="flex-1 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
}
