import { useState, useEffect } from 'react';
import { nexusApi } from '../services/nexusApi';

export default function useKPIs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchKPIs = async () => {
    try {
      setLoading(true);
      const res = await nexusApi.getKPIs();
      setData(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKPIs();
  }, []);

  return { data, loading, error, refetch: fetchKPIs };
}
