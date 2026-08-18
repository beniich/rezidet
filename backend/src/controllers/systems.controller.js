// Systèmes physiques et services de bâtiments REZIDET

exports.getAccessControl = async (req, res) => {
  try {
    res.json({
      doors: [
        { id: 'door1', name: 'Entrée Principale', status: 'locked', lastAccess: '12 min ago by J. Dupont' },
        { id: 'door2', name: 'Local Technique', status: 'locked', lastAccess: '2 hours ago by Tech A' },
        { id: 'door3', name: 'Parking Résidents', status: 'unlocked', lastAccess: 'Just now' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHVAC = async (req, res) => {
  try {
    res.json({
      setpoint: 21.0,
      boilerStatus: 'idle',
      boilerTemp: 64.5,
      cop: 4.2,
      vmc: [
        { id: 'vmc-north', zone: 'Zone Nord', speed: 80 },
        { id: 'vmc-south', zone: 'Zone Sud', speed: 45 }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getElectrical = async (req, res) => {
  try {
    res.json({
      activePower: 4.8, // kW
      dailyConsumption: 12.4, // kWh
      voltage: 232, // V
      frequency: 50.0 // Hz
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getParking = async (req, res) => {
  try {
    res.json({
      totalSpaces: 20,
      occupiedSpaces: 6,
      chargingStations: [
        { id: 'charger-1', name: 'Borne Rapide A', status: 'charging', power: '22 kW' },
        { id: 'charger-2', name: 'Borne Standard B', status: 'available', power: '0 kW' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSpacesReservations = async (req, res) => {
  try {
    res.json({
      coworking: { occupied: 12, capacity: 15, status: 'available' },
      conference: { title: 'Réunion Syndic', schedule: '14h00 - 16h00', status: 'occupied' }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
