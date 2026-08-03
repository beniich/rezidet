import { useEffect, useState, useCallback } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'cafm-offline';
const DB_VERSION = 1;
const STORE = 'pending-actions';

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
      }
    }
  });
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const updateCount = useCallback(async () => {
    try {
      const db = await getDB();
      const count = await db.count(STORE);
      setPendingCount(count);
    } catch {}
  }, []);

  const executeAction = useCallback(async (action) => {
    const token = localStorage.getItem('token');
    const res = await fetch(action.url, {
      method: action.method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: action.body ? JSON.stringify(action.body) : undefined
    });
    if (!res.ok) throw new Error('Action failed');
    return res.json().catch(() => null);
  }, []);

  const syncNow = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      const db = await getDB();
      const actions = await db.getAll(STORE);
      for (const action of actions) {
        try {
          await executeAction(action);
          await db.delete(STORE, action.id);
        } catch {}
      }
      await updateCount();
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, executeAction, updateCount]);

  const queueAction = useCallback(async (action) => {
    if (isOnline) {
      try { return await executeAction(action); } catch {}
    }
    const db = await getDB();
    await db.add(STORE, { ...action, timestamp: Date.now() });
    await updateCount();
  }, [isOnline, executeAction, updateCount]);

  useEffect(() => {
    updateCount();
    const onOnline = () => { setIsOnline(true); syncNow(); };
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => { window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline); };
  }, [updateCount, syncNow]);

  return { isOnline, pendingCount, isSyncing, queueAction, syncNow };
}
