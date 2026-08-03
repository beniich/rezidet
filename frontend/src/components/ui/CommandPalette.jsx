import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Package, Wrench, BarChart3, Settings, Coins, Activity, TrendingUp, ArrowRight } from 'lucide-react';

const COMMANDS = [
  // Navigation
  { id: 'nav-dashboard',  title: 'Dashboard',           section: 'Navigation', icon: Hash,       path: '/dashboard' },
  { id: 'nav-assets',     title: 'Actifs & équipements', section: 'Navigation', icon: Package,    path: '/dashboard/assets' },
  { id: 'nav-workorders', title: 'Interventions',        section: 'Navigation', icon: Wrench,     path: '/dashboard/work-orders' },
  { id: 'nav-analytics',  title: 'Analytics',            section: 'Navigation', icon: BarChart3,  path: '/dashboard/analytics' },
  { id: 'nav-settings',   title: 'Paramètres',           section: 'Navigation', icon: Settings,   path: '/dashboard/settings' },
  { id: 'nav-staking',    title: 'Staking CAFM',         section: 'Web3',       icon: Coins,      path: '/dashboard/staking' },
  { id: 'nav-perps',      title: 'Perpetual Trading',    section: 'Web3',       icon: TrendingUp, path: '/dashboard/perpetuals' },
  { id: 'nav-oracle',     title: 'Oracle Prices',        section: 'Web3',       icon: Activity,   path: '/dashboard/oracle' },
  // Actions
  { id: 'new-wo',    title: 'Nouvelle intervention',  section: 'Actions', icon: Wrench,  path: '/dashboard/work-orders?new=1' },
  { id: 'new-asset', title: 'Nouvel actif',           section: 'Actions', icon: Package, path: '/dashboard/assets?new=1' },
];

export function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query) return COMMANDS;
    const q = query.toLowerCase();
    return COMMANDS.filter(c => c.title.toLowerCase().includes(q) || c.section.toLowerCase().includes(q));
  }, [query]);

  // Group by section
  const grouped = useMemo(() => {
    return filtered.reduce((acc, cmd) => {
      (acc[cmd.section] ??= []).push(cmd);
      return acc;
    }, {});
  }, [filtered]);

  useEffect(() => { setIdx(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && filtered[idx]) { navigate(filtered[idx].path); onClose(); }
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, filtered, idx, navigate, onClose]);

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  if (!open) return null;

  let flatIdx = 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Search */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]">
            <Search className="w-5 h-5 text-[var(--color-muted)] shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher une page ou une action..."
              className="flex-1 bg-transparent text-[var(--color-foreground)] text-sm placeholder:text-[var(--color-muted)] outline-none"
            />
            <kbd className="hidden md:block text-xs text-[var(--color-muted)] bg-[var(--color-bg)] px-2 py-1 rounded border border-[var(--color-border)]">ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto py-2">
            {Object.entries(grouped).map(([section, cmds]) => (
              <div key={section}>
                <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">{section}</p>
                {cmds.map(cmd => {
                  const currentIdx = flatIdx++;
                  const isActive = currentIdx === idx;
                  return (
                    <button
                      key={cmd.id}
                      onMouseEnter={() => setIdx(currentIdx)}
                      onClick={() => { navigate(cmd.path); onClose(); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition ${isActive ? 'bg-[var(--color-bg)] text-[var(--color-foreground)]' : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-[var(--color-border)]'}`}>
                        <cmd.icon className="w-4 h-4" />
                      </div>
                      <span className="flex-1 text-left font-medium">{cmd.title}</span>
                      {isActive && <ArrowRight className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-[var(--color-muted)]">Aucun résultat pour « {query} »</p>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-[var(--color-border)] flex items-center gap-4 text-xs text-[var(--color-muted)]">
            <span><kbd className="bg-[var(--color-bg)] border border-[var(--color-border)] px-1.5 py-0.5 rounded">↑↓</kbd> naviguer</span>
            <span><kbd className="bg-[var(--color-bg)] border border-[var(--color-border)] px-1.5 py-0.5 rounded">↵</kbd> ouvrir</span>
            <span><kbd className="bg-[var(--color-bg)] border border-[var(--color-border)] px-1.5 py-0.5 rounded">Ctrl K</kbd> ouvrir</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
