const prisma = require('../config/database');

/**
 * Devenir partenaire
 */
exports.becomePartner = async (req, res) => {
  try {
    const existing = await prisma.affiliatePartner.findUnique({
      where: { userId: req.user.id }
    });
    if (existing) return res.json(existing);

    const code = `CAFM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const partner = await prisma.affiliatePartner.create({
      data: {
        userId: req.user.id,
        referralCode: code,
        commissionRate: 0.20
      }
    });

    res.status(201).json(partner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Tracker un referral (cookie)
 */
exports.trackReferral = async (req, res) => {
  try {
    const { code } = req.params;
    const partner = await prisma.affiliatePartner.findUnique({
      where: { referralCode: code }
    });

    if (!partner) return res.status(404).json({ error: 'Code invalide' });

    res.cookie('affiliate_ref', code, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ success: true, partnerCode: code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Dashboard partenaire
 */
exports.getDashboard = async (req, res) => {
  try {
    const partner = await prisma.affiliatePartner.findUnique({
      where: { userId: req.user.id },
      include: { referrals: true }
    });

    if (!partner) return res.status(404).json({ error: 'Pas encore partenaire' });

    res.json({
      referralCode: partner.referralCode,
      commissionRate: partner.commissionRate * 100,
      totalEarned: partner.totalEarned,
      pendingPayout: partner.totalEarned - partner.totalPaid,
      referrals: partner.referrals.length,
      conversionRate: partner.referrals.length > 0
        ? (partner.referrals.filter(r => r.status === 'CONFIRMED').length / partner.referrals.length) * 100
        : 0,
      referralLink: `${process.env.APP_URL || 'http://localhost:5173'}?ref=${partner.referralCode}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
