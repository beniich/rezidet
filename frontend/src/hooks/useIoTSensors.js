import { useState, useEffect } from 'react';
import { nexusApi } from '../services/nexusApi';

export default function useIoTSensors(type) {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSensors = async () => {
    try {
      setLoading(true);
      const data = await nexusApi.getSensors(type);
      setSensors(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensors();
  }, [type]);

  return { sensors, loading, error, refetch: fetchSensors };
}
