const prisma = require('../config/database');

exports.getSensors = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) {
      filter.type = type;
    }
    
    const sensors = await prisma.sensor.findMany({
      where: filter,
      include: {
        readings: {
          take: 10,
          orderBy: { timestamp: 'desc' }
        }
      }
    });
    
    // Si aucun capteur n'existe encore en base, renvoyer des mockups
    if (sensors.length === 0) {
      const mockSensors = [
        { id: 'mock-s1', name: 'Capteur Température RDC', type: 'temperature', value: 21.8, unit: '°C', status: 'active', readings: [] },
        { id: 'mock-s2', name: 'Capteur Humidité RDC', type: 'humidity', value: 48, unit: '%', status: 'active', readings: [] },
        { id: 'mock-s3', name: 'Capteur CO2 Bureau 1', type: 'co2', value: 420, unit: 'ppm', status: 'active', readings: [] },
        { id: 'mock-s4', name: 'Débitmètre Principal', type: 'water', value: 12.4, unit: 'L/min', status: 'active', readings: [] },
        { id: 'mock-s5', name: 'Détecteur Fumée Hall', type: 'fire', value: 0, unit: 'bool', status: 'active', readings: [] }
      ];
      
      const filteredMocks = type ? mockSensors.filter(s => s.type === type) : mockSensors;
      return res.json(filteredMocks);
    }
    
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNetworkTopology = async (req, res) => {
  try {
    // Structure réseau simulée ou dynamique
    res.json({
      nodes: [
        { id: 'N1', label: 'Passerelle Principale', status: 'online', ip: '192.168.1.1' },
        { id: 'N2', label: 'Nœud Aile Nord', status: 'online', ip: '192.168.1.2' },
        { id: 'N3', label: 'Nœud Aile Sud', status: 'online', ip: '192.168.1.3' },
        { id: 'N4', label: 'Nœud Parking', status: 'offline', ip: '192.168.1.4' }
      ],
      connections: [
        { from: 'N1', to: 'N2', strength: '95%' },
        { from: 'N1', to: 'N3', strength: '88%' },
        { from: 'N2', to: 'N4', strength: '0%' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
