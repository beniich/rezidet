import { useState, useEffect } from 'react';
import { nexusApi } from '../services/nexusApi';

const mockStats = {
  activeNodes: 124,
  networkUptime: '99.98%',
  cpuLoad: '14.2%',
  totalBuildings: 8
};

export default function usePublicStats() {
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await nexusApi.getPublicStats();
      setStats(data);
    } catch (err) {
      console.warn("usePublicStats API error, using mock data:", err.message);
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}
