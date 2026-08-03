const prisma = require('../config/database');
const { stripe } = require('../config/stripe');

const PLATFORM_FEE_PERCENT = 30; // 30% pour la plateforme

/**
 * Lister les items du marketplace
 */
exports.listItems = async (req, res) => {
  const { category, search, sort = 'popular' } = req.query;
  
  const where = { status: 'PUBLISHED' };
  if (category) where.category = category;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } }
    ];
  }

  const items = await prisma.marketplaceItem.findMany({
    where,
    include: {
      vendor: { select: { name: true, logoUrl: true } }
    },
    orderBy: sort === 'rating' ? { rating: 'desc' } : { installs: 'desc' },
    take: 50
  });

  res.json(items);
};

/**
 * Installer un item (gratuit ou payant)
 */
exports.install = async (req, res) => {
  const { itemId } = req.params;
  const item = await prisma.marketplaceItem.findUnique({
    where: { id: itemId },
    include: { vendor: true }
  });

  if (!item) return res.status(404).json({ error: 'Item non trouvé' });

  // Vérifier si déjà installé
  const existing = await prisma.marketplaceInstallation.findUnique({
    where: { itemId_tenantId: { itemId, tenantId: req.user.tenantId } }
  });

  if (existing) return res.status(400).json({ error: 'Déjà installé' });

  // Si payant, créer session de paiement
  if (item.pricingModel === 'one_time' && item.price > 0) {
    const sub = await prisma.subscription.findUnique({
      where: { tenantId: req.user.tenantId }
    });

    const session = await stripe.checkout.sessions.create({
      customer: sub.stripeCustomerId,
      mode: 'payment',
      payment_intent_data: {
        application_fee_amount: Math.round(item.price * 100 * PLATFORM_FEE_PERCENT / 100),
        transfer_data: { destination: item.vendor.stripeAccountId }
      },
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: 1
      }],
      success_url: `${process.env.APP_URL || 'http://localhost:5173'}/marketplace?installed=${itemId}`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:5173'}/marketplace`,
      metadata: { itemId, tenantId: req.user.tenantId, type: 'marketplace' }
    });

    return res.json({ sessionId: session.id, url: session.url });
  }

  // Installation gratuite
  await prisma.marketplaceInstallation.create({
    data: {
      itemId,
      tenantId: req.user.tenantId,
      config: req.body.config ? JSON.stringify(req.body.config) : null
    }
  });

  await prisma.marketplaceItem.update({
    where: { id: itemId },
    data: { installs: { increment: 1 } }
  });

  res.json({ success: true });
};

/**
 * Soumettre un item au marketplace (pour vendors)
 */
exports.submitItem = async (req, res) => {
  const { name, description, category, pricingModel, price, iconUrl } = req.body;

  const item = await prisma.marketplaceItem.create({
    data: {
      name,
      description,
      longDescription: req.body.longDescription,
      category,
      pricingModel,
      price: parseFloat(price) || 0,
      iconUrl,
      vendorId: req.user.vendorId, // L'utilisateur doit être vendor
      status: 'DRAFT'
    }
  });

  res.status(201).json(item);
};

/**
 * Statistiques vendor
 */
exports.getVendorStats = async (req, res) => {
  const stats = await prisma.marketplaceRevenue.aggregate({
    where: { vendorId: req.user.vendorId },
    _sum: { grossAmount: true, platformFee: true, vendorAmount: true },
    _count: true
  });

  const items = await prisma.marketplaceItem.count({
    where: { vendorId: req.user.vendorId }
  });

  res.json({
    totalRevenue: stats._sum.grossAmount || 0,
    platformFees: stats._sum.platformFee || 0,
    netRevenue: stats._sum.vendorAmount || 0,
    transactions: stats._count,
    itemsCount: items
  });
};
