const { stripe } = require('../config/stripe');

/**
 * Créer une session checkout avec TVA automatique
 */
exports.createCheckoutWithTax = async (req, res) => {
  const { priceId, customerId, tenantId } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },
      billing_address_collection: 'required',
      success_url: `${process.env.APP_URL || 'http://localhost:5173'}/dashboard/billing?success=true`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:5173'}/dashboard/billing`,
      metadata: { tenantId }
    });
    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Valider un numéro de TVA UE via VIES
 */
exports.validateVAT = async (req, res) => {
  const { country, vatNumber } = req.body;
  if (!country || !vatNumber) return res.status(400).json({ error: 'country et vatNumber requis' });

  try {
    const resp = await fetch(`https://ec.europa.eu/taxation_customs/vies/rest/api/check/${country}/${vatNumber.replace(/[^A-Z0-9]/gi, '')}`);
    if (!resp.ok) throw new Error('VIES indisponible');
    const data = await resp.json();
    res.json({
      valid: data.valid === true,
      name: data.name,
      address: data.address,
      countryCode: data.countryCode
    });
  } catch (err) {
    res.json({ valid: false, error: 'Service VIES temporairement indisponible. Vérification manuelle requise.' });
  }
};
