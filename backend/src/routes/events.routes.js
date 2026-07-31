const express = require('express');
const prisma = require('../config/database');
const router = express.Router();

/**
 * Server-Sent Events pour notifications temps réel
 * SSE = connexion persistante HTTP, le serveur push au client
 */

// Stockage des clients connectés par tenant
const clients = new Map(); // tenantId -> Set<response>

router.get('/events', async (req, res) => {
  // Auth via query token (SSE ne supporte pas les headers custom)
  const token = req.query.token;
  if (!token) return res.status(401).end();

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tenantId = decoded.tenantId;

    // Configuration SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.flushHeaders();

    // Heartbeat pour maintenir la connexion
    const heartbeat = setInterval(() => {
      res.write(': heartbeat\n\n');
    }, 30000);

    // Ajouter le client
    if (!clients.has(tenantId)) clients.set(tenantId, new Set());
    clients.get(tenantId).add(res);

    console.log(`📡 SSE client connected (tenant: ${tenantId}, total: ${clients.get(tenantId).size})`);

    // Event initial de connexion
    res.write(`event: connected\ndata: ${JSON.stringify({ tenantId, timestamp: Date.now() })}\n\n`);

    // Nettoyage à la déconnexion
    req.on('close', () => {
      clearInterval(heartbeat);
      clients.get(tenantId)?.delete(res);
      console.log(`📡 SSE client disconnected (remaining: ${clients.get(tenantId)?.size || 0})`);
    });
  } catch (err) {
    res.status(401).end();
  }
});

// Fonction utilitaire pour broadcaster un event
const broadcast = (tenantId, eventType, data) => {
  const tenantClients = clients.get(tenantId);
  if (!tenantClients) return 0;
  
  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  let sent = 0;
  
  tenantClients.forEach(client => {
    try {
      client.write(payload);
      sent++;
    } catch (err) {
      tenantClients.delete(client);
    }
  });
  
  return sent;
};

// Export pour utilisation dans d'autres controllers
router.broadcast = broadcast;

// Surveillance DB (changements toutes les 5s)
setInterval(async () => {
  try {
    // Détecter nouveaux deals gagnés
    const recentDeals = await prisma.deal.findMany({
      where: {
        status: 'WON',
        closedAt: { gte: new Date(Date.now() - 10000) } // 10s
      },
      include: { contact: { select: { firstName: true, lastName: true } } }
    });

    recentDeals.forEach(deal => {
      broadcast(deal.organizationId, 'deal_won', {
        id: deal.id,
        name: deal.name,
        amount: deal.amount,
        contact: deal.contact
      });
    });

  } catch (err) {
    console.error('SSE poll error:', err.message);
  }
}, 5000);

module.exports = router;
