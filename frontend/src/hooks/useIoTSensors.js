import { useState, useEffect } from 'react';
import { nexusApi } from '../services/nexusApi';

const mockSensors = [
  { id: 'mock-s1', name: 'Capteur Température RDC', type: 'temperature', value: 21.8, unit: '°C', status: 'active' },
  { id: 'mock-s2', name: 'Capteur Humidité RDC', type: 'humidity', value: 48, unit: '%', status: 'active' },
  { id: 'mock-s3', name: 'Capteur CO2 Bureau 1', type: 'co2', value: 420, unit: 'ppm', status: 'active' },
  { id: 'mock-s4', name: 'Débitmètre Principal', type: 'water', value: 12.4, unit: 'L/min', status: 'active' },
  { id: 'mock-s5', name: 'Détecteur Fumée Hall', type: 'fire', value: 0, unit: 'bool', status: 'active' }
];

export default function useIoTSensors(type) {
  const [sensors, setSensors] = useState(mockSensors);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSensors = async () => {
    try {
      setLoading(true);
      const data = await nexusApi.getSensors(type);
      setSensors(data);
    } catch (err) {
      console.warn("useIoTSensors API error, using mock data:", err.message);
      const filtered = type ? mockSensors.filter(s => s.type === type) : mockSensors;
      setSensors(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensors();
  }, [type]);

  return { sensors, loading, error, refetch: fetchSensors };
}
