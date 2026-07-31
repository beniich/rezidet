const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'cafm-crm-secret-key-2026';

/**
 * Middleware d'authentification pour le module CRM SaaS.
 * Injecte req.crm = { userId, organizationId, role }
 */
exports.crmAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant (CRM)' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.crm = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide (CRM)' });
  }
};
