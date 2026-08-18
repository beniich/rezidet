require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const app = require('./app');
const prisma = require('./config/database');
const { createServer } = require('http');
const { Server } = require('socket.io');

// ============== VALIDATION PRODUCTION ==============
if (process.env.NODE_ENV === 'production') {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'FIREBASE_SERVICE_ACCOUNT_PATH'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Variables d\'environnement manquantes:', missing.join(', '));
    process.exit(1);
  }
  
  if (process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET doit faire au moins 32 caractères');
    process.exit(1);
  }
}

// ============== INITIALISATION SERVICES ==============
async function initializeServices() {
  console.log('🚀 Démarrage Rezidet Backend');
  console.log(`📍 Environnement: ${process.env.NODE_ENV}`);
  console.log(`🔌 Port: ${process.env.PORT || 8081}`);

  // 1. Test connexion DB
  try {
    await prisma.$connect();
    console.log('✅ Base de données connectée');
  } catch (err) {
    console.error('❌ Erreur DB:', err.message);
    process.exit(1);
  }

  // 2. Initialiser Firebase (échoue en prod si pas de credentials)
  try {
    require('./services/firebaseAdmin.service');
    console.log('✅ Firebase Admin initialisé');
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Firebase Admin requis en production:', err.message);
      process.exit(1);
    }
    console.warn('⚠️  Firebase Admin en mode mock (DEV uniquement)');
  }

  // 3. Sentry (optionnel)
  if (process.env.SENTRY_DSN) {
    const Sentry = require('@sentry/node');
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1
    });
    console.log('✅ Sentry initialisé');
  }
}

// ============== HTTP + SOCKET.IO SERVER ==============
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true
  },
  pingTimeout: 60000
});

// Injecter io dans les routes
app.set('io', io);
global.io = io;

// WebSocket auth middleware
io.use((socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;
  if (!token) return next(new Error('Token manquant'));
  
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.data = decoded;
    next();
  } catch (err) {
    next(new Error('Token invalide'));
  }
});

io.on('connection', (socket) => {
  const orgId = socket.data?.tenantId;
  if (orgId) {
    socket.join(`org:${orgId}`);
  }
  console.log(`🔌 Client connecté: ${socket.id} (org: ${orgId})`);
  
  socket.on('disconnect', () => {
    console.log(`🔌 Client déconnecté: ${socket.id}`);
  });
});

// ============== DÉMARRAGE ==============
const PORT = process.env.PORT || 8081;

initializeServices().then(() => {
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
    console.log(`🌐 API: http://localhost:${PORT}/api`);
    console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  });
});

// ============== GRACEFUL SHUTDOWN ==============
const shutdown = async (signal) => {
  console.log(`\n⚠️  ${signal} reçu, arrêt en cours...`);
  
  httpServer.close(() => {
    console.log('✅ Serveur HTTP fermé');
  });
  
  try {
    await prisma.$disconnect();
    console.log('✅ DB déconnectée');
  } catch (err) {
    console.error('❌ Erreur DB disconnect:', err);
  }
  
  process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Erreurs non capturées
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});
