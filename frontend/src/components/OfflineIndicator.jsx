import { useOfflineSync } from '../hooks/useOfflineSync';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OfflineIndicator() {
  const { isOnline, pendingCount, isSyncing, syncNow } = useOfflineSync();

  return (
    <AnimatePresence>
      {(!isOnline || (isOnline && pendingCount > 0)) && (
        <motion.div
          key={isOnline ? 'syncing' : 'offline'}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className={`fixed top-0 left-0 right-0 z-[9998] flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white ${!isOnline ? 'bg-amber-500' : 'bg-blue-500'}`}
        >
          {!isOnline ? (
            <>
              <WifiOff className="w-4 h-4" />
              Mode hors ligne · {pendingCount} action{pendingCount > 1 ? 's' : ''} en attente de synchronisation
            </>
          ) : (
            <>
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              Synchronisation en cours · {pendingCount} action{pendingCount > 1 ? 's' : ''}...
              {!isSyncing && (
                <button onClick={syncNow} className="ml-2 underline text-white/90 hover:text-white">Forcer</button>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
