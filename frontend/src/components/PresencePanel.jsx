import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, Clock, MinusCircle, EyeOff, X } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const STATUS_CONFIG = {
  online:    { label: 'En ligne',          bg: 'bg-green-500',  color: 'text-green-600' },
  busy:      { label: 'Occupé',            bg: 'bg-red-500',    color: 'text-red-600' },
  away:      { label: 'Absent',            bg: 'bg-amber-400',  color: 'text-amber-600' },
  dnd:       { label: 'Ne pas déranger',   bg: 'bg-red-700',    color: 'text-red-700' },
  invisible: { label: 'Invisible',         bg: 'bg-slate-400',  color: 'text-slate-400' },
  offline:   { label: 'Hors ligne',        bg: 'bg-slate-300',  color: 'text-slate-400' }
};

const STATUS_PRESETS = [
  { id: 'online', emoji: '💚', message: 'Disponible' },
  { id: 'busy',   emoji: '🔴', message: 'En réunion' },
  { id: 'dnd',    emoji: '⛔', message: 'Ne pas déranger' },
  { id: 'away',   emoji: '☕', message: 'Pause café' }
];

export function StatusDot({ status = 'offline', size = 'sm' }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.offline;
  const sz = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5';
  return <span className={`${sz} rounded-full ${cfg.bg} border-2 border-white inline-block`} />;
}

export function PresencePanel({ isOpen, onClose, currentUser }) {
  const [presences, setPresences] = useState([]);
  const [myStatus, setMyStatus] = useState('online');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    loadPresences();
    const s = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8081');
    setSocket(s);
    s.on('presence:changed', (p) => {
      setPresences(prev => {
        const idx = prev.findIndex(x => x.userId === p.userId);
        if (idx >= 0) { const n = [...prev]; n[idx] = { ...n[idx], ...p }; return n; }
        return [...prev, p];
      });
    });
    return () => s.disconnect();
  }, [isOpen]);

  const loadPresences = async () => {
    try {
      const { data } = await api.get('/presence/organization');
      setPresences(data);
      const me = data.find(p => p.userId === currentUser?.id);
      if (me) setMyStatus(me.status);
    } catch {}
  };

  const updateStatus = async (status, statusMessage, statusEmoji) => {
    setMyStatus(status);
    socket?.emit('presence:update', { status, statusMessage, statusEmoji });
    await api.patch('/presence/me', { status, statusMessage, statusEmoji }).catch(() => {});
    toast.success(`Statut: ${STATUS_CONFIG[status]?.label}`);
  };

  const online = presences.filter(p => p.status !== 'offline');
  const offline = presences.filter(p => p.status === 'offline');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 360, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 360, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
        >
          <div className="p-4 border-b flex items-center justify-between bg-slate-50">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <StatusDot status="online" size="md" />
              Présence équipe
            </h3>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* My status selector */}
          <div className="p-4 border-b">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">Mon statut</p>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => updateStatus(preset.id, preset.message, preset.emoji)}
                  className={`p-2 rounded-xl border-2 text-left transition-all ${
                    myStatus === preset.id
                      ? 'border-orange-400 bg-orange-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{preset.emoji}</span>
                    <span className="text-xs font-medium text-slate-700">{STATUS_CONFIG[preset.id].label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              En ligne ({online.length})
            </p>
            {online.map(p => (
              <PresenceRow key={p.userId} presence={p} />
            ))}
            {offline.length > 0 && (
              <>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-4 mb-2">
                  Hors ligne ({offline.length})
                </p>
                <div className="opacity-50 space-y-1">
                  {offline.map(p => <PresenceRow key={p.userId} presence={p} />)}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PresenceRow({ presence }) {
  const cfg = STATUS_CONFIG[presence.status] || STATUS_CONFIG.offline;
  const initials = `${presence.firstName?.[0] || '?'}${presence.lastName?.[0] || ''}`;
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
      <div className="relative">
        {presence.avatar ? (
          <img src={presence.avatar} className="w-8 h-8 rounded-full object-cover" alt={initials} />
        ) : (
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
        )}
        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${cfg.bg}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{presence.firstName} {presence.lastName}</p>
        <p className={`text-xs ${cfg.color} truncate`}>
          {presence.statusMessage || cfg.label}
          {presence.currentPage && <span className="text-slate-400"> · {getPageName(presence.currentPage)}</span>}
        </p>
      </div>
    </div>
  );
}

function getPageName(path) {
  if (!path) return '';
  if (path.includes('work-orders')) return 'Interventions';
  if (path.includes('assets')) return 'Actifs';
  if (path.includes('dashboard')) return 'Dashboard';
  if (path.includes('maintenance')) return 'Maintenance';
  return path.split('/').pop();
}
