import { useState, useEffect } from 'react';
import { nexusApi } from '../services/nexusApi';

const mockKPIs = {
  kpis: {
    activeSensors: 124,
    totalSensors: 128,
    totalBuildings: 8,
    criticalWorkOrders: 1,
    pendingWorkOrders: 4,
    assetAvailability: 99.8
  }
};

export default function useKPIs() {
  const [data, setData] = useState(mockKPIs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchKPIs = async () => {
    try {
      setLoading(true);
      const res = await nexusApi.getKPIs();
      setData(res);
    } catch (err) {
      console.warn("useKPIs API error, using mock data:", err.message);
      setData(mockKPIs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKPIs();
  }, []);

  return { data, loading, error, refetch: fetchKPIs };
}
