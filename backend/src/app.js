/**
 * Express app configuration (séparé de server.js pour les tests)
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { corsOptions } = require('./config/cors');

const app = express();

// ============== SECURITY MIDDLEWARES ==============
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://js.stripe.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      connectSrc: ["'self'", 'https://api.stripe.com', 'wss:'],
      frameSrc: ['https://js.stripe.com', 'https://hooks.stripe.com']
    }
  } : false,
  crossOriginEmbedderPolicy: false
}));

app.use(compression());

// CORS
app.use(cors(corsOptions));

// Body parser (AVANT le webhook Stripe)
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust proxy (pour nginx en reverse proxy)
app.set('trust proxy', 1);

// ============== ROUTES ==============
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '2.1.0',
    environment: process.env.NODE_ENV,
    uptime: process.uptime()
  });
});

// Routes API
app.use('/api/auth', require('./routes/auth.routes'));
// TODO: créer user.routes.js
// app.use('/api/users', require('./routes/user.routes'));
app.use('/api/assets', require('./routes/asset.routes'));
app.use('/api/workorders', require('./routes/workorder.routes'));
app.use('/api/spaces', require('./routes/space.routes'));
app.use('/api/buildings', require('./routes/building.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));
app.use('/api/leases', require('./routes/lease.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use('/api/billing', require('./routes/billing.routes'));
app.use('/api/licenses', require('./routes/license.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
// TODO: créer ai.routes.js
// app.use('/api/ai', require('./routes/ai.routes'));
// TODO: créer crypto.routes.js
// app.use('/api/crypto', require('./routes/crypto.routes'));
// TODO: créer oracle.routes.js
// app.use('/api/oracle', require('./routes/oracle.routes'));

// ============== 404 HANDLER ==============
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint non trouvé' });
});

// ============== ERROR HANDLER ==============
app.use((err, req, res, next) => {
  console.error('❌ Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Sentry (si configuré)
  if (process.env.SENTRY_DSN) {
    const Sentry = require('@sentry/node');
    Sentry.captureException(err, {
      tags: { path: req.path, method: req.method }
    });
  }

  res.status(err.statusCode || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Erreur serveur' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

module.exports = app;
