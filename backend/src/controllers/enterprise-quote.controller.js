const prisma = require('../config/database');

/**
 * Créer une demande de devis Enterprise
 */
exports.requestQuote = async (req, res) => {
  try {
    const data = req.body;
    const pricing = calculateEnterprisePricing(data);

    const count = await prisma.enterpriseQuote.count();
    const reference = `QUO-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const quote = await prisma.enterpriseQuote.create({
      data: {
        reference,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone || null,
        companyName: data.companyName,
        companySize: data.companySize || null,
        industry: data.industry || null,
        country: data.country || 'FR',
        userCount: data.userCount || 50,
        assetCount: data.assetCount || 500,
        buildingCount: data.buildingCount || 5,
        selectedFeatures: JSON.stringify(data.features || []),
        monthlyBase: pricing.monthlyBase,
        perUserPrice: pricing.perUserPrice,
        setupFee: pricing.setupFee,
        totalMonthly: pricing.totalMonthly,
        totalYearly: pricing.totalYearly,
        discountPercent: pricing.discountPercent,
        contractMonths: data.contractMonths || 12,
        status: 'DRAFT',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });

    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Calcul pricing Enterprise
 */
function calculateEnterprisePricing(data) {
  const userCount = data.userCount || 50;
  const contractMonths = data.contractMonths || 12;

  let monthlyBase = 199;
  let perUserPrice = userCount > 25 ? (userCount - 25) * 5 : 0;
  let totalMonthly = monthlyBase + perUserPrice;

  let discountPercent = 0;
  if (userCount >= 100) discountPercent = 10;
  if (userCount >= 250) discountPercent = 15;
  if (userCount >= 500) discountPercent = 20;
  if (contractMonths >= 24) discountPercent += 5;

  if (discountPercent > 0) {
    totalMonthly = totalMonthly * (1 - discountPercent / 100);
  }

  const setupFee = contractMonths >= 12 ? 0 : 1500;

  return {
    monthlyBase,
    perUserPrice,
    setupFee,
    totalMonthly: Math.round(totalMonthly * 100) / 100,
    totalYearly: Math.round(totalMonthly * 12 * 100) / 100,
    discountPercent
  };
}

/**
 * Calculer le prix (helper public pour le frontend)
 */
exports.calculatePrice = async (req, res) => {
  const pricing = calculateEnterprisePricing(req.body);
  res.json(pricing);
};

/**
 * Lister les devis (admin)
 */
exports.listQuotes = async (req, res) => {
  try {
    const quotes = await prisma.enterpriseQuote.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Mettre à jour le statut
 */
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  try {
    const quote = await prisma.enterpriseQuote.findUnique({ where: { id } });
    if (!quote) return res.status(404).json({ error: 'Devis introuvable' });

    const existing = quote.history ? JSON.parse(quote.history) : [];

    const updated = await prisma.enterpriseQuote.update({
      where: { id },
      data: {
        status,
        notes,
        history: JSON.stringify([
          ...existing,
          { date: new Date().toISOString(), action: status, note: notes, by: req.user?.email || 'system' }
        ])
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
