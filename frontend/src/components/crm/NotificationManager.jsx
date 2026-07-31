import React, { useEffect, useRef, useCallback } from 'react';
import { useSSE } from '../../hooks/useSSE';
import toast from 'react-hot-toast';
import { Trophy, AlertTriangle, UserPlus, Package, TrendingUp } from 'lucide-react';
import { useCrmStore } from '../../store/crmStore';

// Précharger les sons
const SOUNDS = {
  ding: new Audio('/sounds/ding.mp3'),
  alert: new Audio('/sounds/alert.mp3'),
  success: new Audio('/sounds/success.mp3')
};

const playSound = (type) => {
  try {
    SOUNDS[type]?.play().catch(() => {});
  } catch {}
};

const NOTIFICATION_CONFIG = {
  deal_won: {
    icon: Trophy,
    type: 'success',
    title: '🎉 Deal gagné !',
    sound: 'success',
    color: 'emerald'
  },
  critical_workorder: {
    icon: AlertTriangle,
    type: 'error',
    title: '🚨 Intervention critique',
    sound: 'alert',
    color: 'red'
  },
  new_deal: {
    icon: TrendingUp,
    type: 'success',
    title: '📈 Nouveau deal',
    sound: 'ding',
    color: 'blue'
  },
  new_contact: {
    icon: UserPlus,
    type: 'success',
    title: '👤 Nouveau contact',
    sound: 'ding',
    color: 'purple'
  },
  asset_alert: {
    icon: Package,
    type: 'error',
    title: '⚠️ Alerte actif',
    sound: 'alert',
    color: 'orange'
  },
  kpi_threshold: {
    icon: TrendingUp,
    type: 'warning',
    title: '📊 Seuil KPI atteint',
    sound: 'alert',
    color: 'yellow'
  }
};

export default function NotificationManager() {
  const lastNotificationTime = useRef({});
  const fetchDashboard = useCrmStore(state => state.fetchDashboard);
  const fetchDeals = useCrmStore(state => state.fetchDeals);
  const fetchContacts = useCrmStore(state => state.fetchContacts);

  // Anti-spam : max 1 notification par type toutes les 3s
  const shouldNotify = (type) => {
    const now = Date.now();
    const last = lastNotificationTime.current[type] || 0;
    if (now - last < 3000) return false;
    lastNotificationTime.current[type] = now;
    return true;
  };

  const handleEvent = useCallback(({ type, data }) => {
    if (!shouldNotify(type)) return;
    
    const config = NOTIFICATION_CONFIG[type];
    if (!config) return;

    // Toast
    const message = type === 'deal_won' 
      ? `${data.name} - ${data.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`
      : type === 'critical_workorder'
      ? data.title
      : type === 'new_deal'
      ? `${data.name} - ${data.amount?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`
      : data.name || 'Nouvel événement';

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-[#18181b]/90 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-zinc-800 rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <config.icon className={`h-10 w-10 text-${config.color}-500`} />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                {config.title}
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));

    // Son
    playSound(config.sound);

    // Refresh data
    fetchDashboard();
    fetchDeals();
    fetchContacts();
  }, [fetchDashboard, fetchDeals, fetchContacts]);

  useSSE(handleEvent);

  // Précharger les sons au mount
  useEffect(() => {
    Object.values(SOUNDS).forEach(audio => {
      audio.volume = 0.3;
      audio.preload = 'auto';
    });
  }, []);

  return null; // Composant invisible
}
