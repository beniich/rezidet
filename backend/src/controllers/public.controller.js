const prisma = require('../config/database');

exports.getStats = async (req, res) => {
  try {
    const totalSensors = await prisma.sensor?.count() || 128;
    const activeSensors = await prisma.sensor?.count({ where: { status: 'active' } }) || 124;
    const totalBuildings = await prisma.building?.count() || 8;
    
    res.json({
      activeNodes: totalSensors,
      networkUptime: '99.98%',
      cpuLoad: '14.2%',
      totalBuildings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPricing = async (req, res) => {
  res.json([
    {
      id: 'starter',
      name: 'Nexus Starter',
      price: '0 €',
      description: 'Parfait pour tester l\'écosystème sur un seul nœud.',
      features: ['Jusqu\'à 5 appareils connectés', 'Journal d\'événements basique', 'Support communautaire']
    },
    {
      id: 'pro',
      name: 'Nexus Pro',
      price: '49 €',
      description: 'Pour les gestionnaires immobiliers professionnels.',
      features: ['Appareils et capteurs illimités', 'Journalisation immuable chiffrée', 'Alertes temps réel & SMS/Push', 'Support technique prioritaire 24/7']
    },
    {
      id: 'enterprise',
      name: 'Nexus Enterprise',
      price: 'Sur Mesure',
      description: 'Pour les infrastructures industrielles de grande envergure.',
      features: ['Intégration sur site (On-Premises)', 'SLA garanti de 99.99%', 'Audits de sécurité personnalisés', 'Déploiement multi-régions']
    }
  ]);
};

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Logique fictive d'envoi d'email/enregistrement en BDD
    console.log(`Contact received: ${name} (${email}) - ${message}`);
    res.json({ success: true, message: 'Message reçu par nos experts.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
