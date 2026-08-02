import { useState, useEffect } from 'react';
import { nexusApi } from '../services/nexusApi';

export default function useSystems(systemType) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSystemData = async () => {
    try {
      setLoading(true);
      let res;
      switch (systemType) {
        case 'access':
          res = await nexusApi.getAccessControl();
          break;
        case 'hvac':
          res = await nexusApi.getHVAC();
          break;
        case 'electrical':
          res = await nexusApi.getElectrical();
          break;
        case 'parking':
          res = await nexusApi.getParking();
          break;
        case 'spaces':
          res = await nexusApi.getSpacesReservations();
          break;
        default:
          throw new Error('Type de système inconnu');
      }
      setData(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemData();
  }, [systemType]);

  return { data, loading, error, refetch: fetchSystemData };
}
