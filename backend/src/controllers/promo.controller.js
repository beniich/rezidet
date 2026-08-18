const prisma = require('../config/database');
const crypto = require('crypto');

/**
 * Valider un code promo
 */
exports.validatePromo = async (req, res) => {
  const { code, plan = 'PRO', billingPeriod = 'monthly' } = req.body;
  if (!code) return res.status(400).json({ valid: false, error: 'Code requis' });

  try {
    const promo = await prisma.promoCode.findUnique({ where: { code: code.toUpperCase() } });
    if (!promo) return res.status(404).json({ valid: false, error: 'Code invalide' });

    if (promo.validFrom > new Date()) return res.status(400).json({ valid: false, error: 'Code pas encore actif' });
    if (promo.validUntil && promo.validUntil < new Date()) return res.status(400).json({ valid: false, error: 'Code expiré' });
    if (promo.maxUses && promo.currentUses >= promo.maxUses) return res.status(400).json({ valid: false, error: 'Code épuisé' });

    const applicablePlans = promo.applicablePlans ? promo.applicablePlans.split(',') : [];
    if (applicablePlans.length > 0 && !applicablePlans.includes(plan)) {
      return res.status(400).json({ valid: false, error: `Code non applicable au plan ${plan}` });
    }

    if (req.user?.tenantId) {
      const used = await prisma.promoRedemption.findFirst({
        where: { promoCodeId: promo.id, tenantId: req.user.tenantId }
      });
      if (used) return res.status(400).json({ valid: false, error: 'Code déjà utilisé par votre organisation' });
    }

    const planPrices = { PRO: billingPeriod === 'yearly' ? 470 : 49, ENTERPRISE: billingPeriod === 'yearly' ? 1910 : 199 };
    const originalAmount = planPrices[plan] || 49;
    let discountAmount = 0;
    if (promo.discountType === 'percent') discountAmount = originalAmount * (promo.discountValue / 100);
    else if (promo.discountType === 'fixed') discountAmount = Math.min(promo.discountValue, originalAmount);

    res.json({
      valid: true,
      code: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalAmount: Math.round((originalAmount - discountAmount) * 100) / 100,
      durationType: promo.durationType,
      durationMonths: promo.durationMonths
    });
  } catch (err) {
    res.status(500).json({ valid: false, error: err.message });
  }
};

/**
 * Générer des codes promo en masse
 */
exports.generateBulkCodes = async (req, res) => {
  const {
    prefix = 'REZIDET', count = 10, discountType = 'percent',
    discountValue = 20, expiresInDays = 30, campaign
  } = req.body;

  try {
    const codes = [];
    for (let i = 0; i < Math.min(count, 100); i++) {
      const suffix = crypto.randomBytes(3).toString('hex').toUpperCase();
      const code = `${prefix}-${suffix}`;
      const promo = await prisma.promoCode.create({
        data: {
          code,
          discountType,
          discountValue,
          campaign,
          validUntil: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
          createdById: req.user?.id
        }
      });

      const shareUrl = `${process.env.APP_URL || 'http://localhost:5173'}?promo=${code}`;
      codes.push({
        code: promo.code,
        shareUrl,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`
      });
    }

    res.status(201).json({ codes, count: codes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Lister toutes les campagnes
 */
exports.listCodes = async (req, res) => {
  try {
    const codes = await prisma.promoCode.findMany({
      include: { redemptions: true },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    res.json(codes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Désactiver un code
 */
exports.deactivateCode = async (req, res) => {
  try {
    await prisma.promoCode.update({
      where: { id: req.params.id },
      data: { validUntil: new Date() }
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
