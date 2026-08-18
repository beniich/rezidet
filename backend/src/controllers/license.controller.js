const prisma = require('../config/database');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');

/**
 * Générer une licence (Admin only)
 * POST /api/licenses/generate
 * Body: { plan, maxUsers, maxAssets, quantity, durationDays, notes }
 */
exports.generate = [
  body('plan').isIn(['FREE', 'PRO', 'ENTERPRISE']),
  body('quantity').optional().isInt({ min: 1, max: 100 }),
  body('durationDays').optional().isInt({ min: 1, max: 3650 }),
  
  async (req, res) => {
    if (req.user.role !== 'SUPERADMIN') {
      return res.status(403).json({ error: 'Accès réservé au super admin' });
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { 
      plan = 'PRO', 
      quantity = 1, 
      maxUsers = 25, 
      maxAssets = 1000, 
      durationDays = 365, 
      notes 
    } = req.body;
    
    // Limites par plan
    const planLimits = {
      FREE: { maxUsers: 1, maxAssets: 5 },
      PRO: { maxUsers: 25, maxAssets: 1000 },
      ENTERPRISE: { maxUsers: 999, maxAssets: 99999 }
    };
    
    const limits = planLimits[plan] || planLimits.PRO;
    
    // Générer N clés
    const licenses = [];
    for (let i = 0; i < quantity; i++) {
      const key = generateLicenseKey(plan);
      
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + durationDays);
      
      const license = await prisma.licenseKey.create({
        data: {
          key,
          plan,
          maxUsers: maxUsers || limits.maxUsers,
          maxAssets: maxAssets || limits.maxAssets,
          durationDays,
          expiresAt,
          status: 'AVAILABLE',
          generatedBy: req.user.email,
          notes
        }
      });
      licenses.push(license);
    }
    
    res.status(201).json({
      success: true,
      count: licenses.length,
      licenses: licenses.map(l => ({
        id: l.id,
        key: l.key,
        plan: l.plan,
        expiresAt: l.expiresAt
      }))
    });
  }
];

/**
 * Lister toutes les licences avec filtres
 * GET /api/licenses?status=AVAILABLE&plan=PRO
 */
exports.list = async (req, res) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  
  const { status, plan, search, page = 1, limit = 50 } = req.query;
  
  const where = {};
  if (status) where.status = status;
  if (plan) where.plan = plan;
  if (search) {
    where.OR = [
      { key: { contains: search, mode: 'insensitive' } },
      { usedByEmail: { contains: search, mode: 'insensitive' } },
      { usedByName: { contains: search, mode: 'insensitive' } }
    ];
  }
  
  const [licenses, total, stats] = await Promise.all([
    prisma.licenseKey.findMany({
      where,
      orderBy: { generatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    }),
    prisma.licenseKey.count({ where }),
    prisma.licenseKey.groupBy({
      by: ['status'],
      _count: true
    })
  ]);
  
  res.json({
    licenses,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    },
    stats: stats.reduce((acc, s) => { acc[s.status] = s._count; return acc; }, {})
  });
};

/**
 * Stats dashboard
 * GET /api/licenses/stats
 */
exports.stats = async (req, res) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  
  const [byStatus, byPlan, recent] = await Promise.all([
    prisma.licenseKey.groupBy({
      by: ['status'],
      _count: true
    }),
    prisma.licenseKey.groupBy({
      by: ['plan', 'status'],
      _count: true
    }),
    prisma.licenseKey.findMany({
      where: { status: 'USED' },
      orderBy: { usedAt: 'desc' },
      take: 5,
      include: { usedByTenant: { select: { name: true } } }
    })
  ]);
  
  const total = byStatus.reduce((sum, s) => sum + s._count, 0);
  const available = byStatus.find(s => s.status === 'AVAILABLE')?._count || 0;
  const used = byStatus.find(s => s.status === 'USED')?._count || 0;
  const revoked = byStatus.find(s => s.status === 'REVOKED')?._count || 0;
  
  res.json({
    total,
    available,
    used,
    revoked,
    expired: byStatus.find(s => s.status === 'EXPIRED')?._count || 0,
    byStatus: byStatus.reduce((acc, s) => { acc[s.status] = s._count; return acc; }, {}),
    byPlan,
    recentUsages: recent
  });
};

/**
 * Révoquer une licence
 * POST /api/licenses/:id/revoke
 */
exports.revoke = async (req, res) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  
  const { id } = req.params;
  const { reason } = req.body;
  
  const license = await prisma.licenseKey.findUnique({ where: { id } });
  if (!license) return res.status(404).json({ error: 'Licence non trouvée' });
  
  if (license.status === 'USED' && license.usedByTenantId) {
    // Optional: could revoke tenant plan here if needed
  }
  
  const updated = await prisma.licenseKey.update({
    where: { id },
    data: {
      status: 'REVOKED',
      revokedAt: new Date(),
      revokedBy: req.user.email,
      revokedReason: reason
    }
  });
  
  res.json({ success: true, license: updated });
};

/**
 * Valider une clé (utilisé à l'inscription)
 * GET /api/licenses/validate/:key
 */
exports.validate = async (req, res) => {
  const { key } = req.params;
  
  const license = await prisma.licenseKey.findUnique({
    where: { key: key.toUpperCase() }
  });
  
  if (!license) {
    return res.json({ valid: false, reason: 'Clé invalide' });
  }
  
  if (license.status !== 'AVAILABLE') {
    return res.json({ 
      valid: false, 
      reason: license.status === 'USED' ? 'Clé déjà utilisée' : `Clé ${license.status.toLowerCase()}` 
    });
  }
  
  if (license.expiresAt && new Date() > license.expiresAt) {
    await prisma.licenseKey.update({
      where: { id: license.id },
      data: { status: 'EXPIRED' }
    });
    return res.json({ valid: false, reason: 'Clé expirée' });
  }
  
  res.json({
    valid: true,
    plan: license.plan,
    maxUsers: license.maxUsers,
    maxAssets: license.maxAssets,
    expiresAt: license.expiresAt
  });
};

/**
 * Exporter les licences en CSV
 * GET /api/licenses/export
 */
exports.export = async (req, res) => {
  if (req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  
  const licenses = await prisma.licenseKey.findMany({
    orderBy: { generatedAt: 'desc' },
    include: { usedByTenant: true }
  });
  
  const csv = [
    ['Key', 'Plan', 'Status', 'Generated', 'Used At', 'Used By Email', 'Used By Org', 'Expires'],
    ...licenses.map(l => [
      l.key,
      l.plan,
      l.status,
      l.generatedAt.toISOString(),
      l.usedAt?.toISOString() || '',
      l.usedByEmail || '',
      l.usedByTenant?.name || '',
      l.expiresAt?.toISOString() || ''
    ])
  ].map(row => row.join(',')).join('\n');
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=licenses-${Date.now()}.csv`);
  res.send(csv);
};

/**
 * Helper
 */
function generateLicenseKey(plan) {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    segments.push(crypto.randomBytes(2).toString('hex').toUpperCase());
  }
  return `CAFM-${plan}-${segments.join('-')}`;
}
