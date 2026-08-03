const prisma = require('../config/database');
const crypto = require('crypto');

function generateKeyString() {
  return 'CAFM-' + crypto.randomBytes(4).toString('hex').toUpperCase() + '-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

exports.generateKeys = async (req, res) => {
  try {
    const { count = 1, plan = 'PRO', maxUsers = 10, expireDays = null } = req.body;
    
    // Check if superadmin
    if (req.user?.role !== 'SUPERADMIN' && req.user?.email !== 'tarikbenaich@gmail.com') {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    let expiresAt = null;
    if (expireDays) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expireDays);
    }

    const keys = [];
    for (let i = 0; i < count; i++) {
      keys.push({
        key: generateKeyString(),
        plan,
        maxUsers,
        expiresAt
      });
    }

    const created = await prisma.licenseKey.createMany({
      data: keys
    });

    // Return the generated keys since createMany doesn't return the full records
    const generatedKeys = await prisma.licenseKey.findMany({
      orderBy: { createdAt: 'desc' },
      take: count
    });

    res.status(201).json({ created: created.count, keys: generatedKeys });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listKeys = async (req, res) => {
  try {
    if (req.user?.role !== 'SUPERADMIN' && req.user?.email !== 'tarikbenaich@gmail.com') {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    const keys = await prisma.licenseKey.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(keys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateKey = async (req, res) => {
  try {
    const { key } = req.body;
    if (!key) return res.status(400).json({ error: 'Clé requise' });

    const license = await prisma.licenseKey.findUnique({ where: { key } });

    if (!license) {
      return res.status(404).json({ error: 'Clé invalide' });
    }
    if (license.isUsed) {
      return res.status(400).json({ error: 'Clé déjà utilisée' });
    }
    if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
      return res.status(400).json({ error: 'Clé expirée' });
    }

    res.json({ valid: true, plan: license.plan, maxUsers: license.maxUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
