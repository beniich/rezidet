import { useState, useEffect } from 'react';
import { nexusApi } from '../services/nexusApi';

const mockSystems = {
  access: {
    doors: [
      { id: 'door1', name: 'Entrée Principale', status: 'locked', lastAccess: '12 min ago by J. Dupont' },
      { id: 'door2', name: 'Local Technique', status: 'locked', lastAccess: '2 hours ago by Tech A' },
      { id: 'door3', name: 'Parking Résidents', status: 'unlocked', lastAccess: 'Just now' }
    ]
  },
  hvac: {
    setpoint: 21.0,
    boilerStatus: 'idle',
    boilerTemp: 64.5,
    cop: 4.2,
    vmc: [
      { id: 'vmc-north', zone: 'Zone Nord', speed: 80 },
      { id: 'vmc-south', zone: 'Zone Sud', speed: 45 }
    ]
  },
  electrical: {
    activePower: 4.8,
    dailyConsumption: 12.4,
    voltage: 232,
    frequency: 50.0
  },
  parking: {
    totalSpaces: 20,
    occupiedSpaces: 6,
    chargingStations: [
      { id: 'charger-1', name: 'Borne Rapide A', status: 'charging', power: '22 kW' },
      { id: 'charger-2', name: 'Borne Standard B', status: 'available', power: '0 kW' }
    ]
  },
  spaces: {
    coworking: { occupied: 12, capacity: 15, status: 'available' },
    conference: { title: 'Réunion Syndic', schedule: '14h00 - 16h00', status: 'occupied' }
  }
};

export default function useSystems(systemType) {
  const [data, setData] = useState(mockSystems[systemType] || null);
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
      console.warn(`useSystems (${systemType}) API error, using mock data:`, err.message);
      setData(mockSystems[systemType] || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemData();
  }, [systemType]);

  return { data, loading, error, refetch: fetchSystemData };
}
