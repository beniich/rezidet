import { useEffect, useRef, useState } from 'react';
import { useCrmAuthStore } from '../store/crmAuthStore';

/**
 * Hook pour écouter les événements Server-Sent Events
 * Reconnexion automatique, gestion erreurs
 */
export const useSSE = (onEvent) => {
  const { token } = useCrmAuthStore();
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    const connect = () => {
      const url = `http://localhost:8081/api/crm/events?token=${encodeURIComponent(token)}`;
      const eventSource = new EventSource(url, { withCredentials: true });
      eventSourceRef.current = eventSource;

      eventSource.addEventListener('connected', (e) => {
        console.log('📡 SSE connected:', JSON.parse(e.data));
        setConnected(true);
      });

      // Écouter tous les events custom
      const eventTypes = [
        'deal_won',
        'critical_workorder',
        'new_deal',
        'new_contact',
        'kpi_threshold',
        'asset_alert'
      ];

      eventTypes.forEach(type => {
        eventSource.addEventListener(type, (e) => {
          try {
            const data = JSON.parse(e.data);
            onEvent?.({ type, data });
          } catch (err) {
            console.error('SSE parse error:', err);
          }
        });
      });

      eventSource.onerror = (e) => {
        console.warn('📡 SSE error, reconnecting in 3s...');
        setConnected(false);
        eventSource.close();
        
        // Reconnexion après 3s
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      eventSourceRef.current?.close();
      clearTimeout(reconnectTimeoutRef.current);
    };
  }, [token, onEvent]);

  return { connected };
};
