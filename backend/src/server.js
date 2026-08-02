require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const http = require('http');
const { Server } = require('socket.io');
const prisma = require('./config/database');
const swaggerRoutes = require('./routes/swagger.routes');
const { sanitizeInput } = require('./middleware/security.middleware');
const { apiLimiter } = require('./middleware/rate-limit.middleware');
const { initSentry, Sentry } = require('./config/sentry');

// Initialize Sentry early
initSentry(app);

// Sentry request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

const authRoutes = require('./routes/auth.routes');
const assetRoutes = require('./routes/asset.routes');
const spaceRoutes = require('./routes/space.routes');
const workOrderRoutes = require('./routes/workorder.routes');
const buildingRoutes = require('./routes/building.routes');
const leaseRoutes = require('./routes/lease.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const maintenanceRoutes = require('./routes/maintenance.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const cmmsRoutes = require('./routes/cmms.routes');
const digitalTwinRoutes = require('./routes/digitaltwin.routes');
const notificationRoutes = require('./routes/notification.routes');
const tenantRoutes = require('./routes/tenant.routes');
const exportRoutes = require('./routes/export.routes');
const erpRoutes = require('./routes/erp.routes');
const bimRoutes = require('./routes/bim.routes');
const crmAuthRoutes = require('./routes/crm.auth.routes');
const crmContactRoutes = require('./routes/crm.contact.routes');
const crmDealRoutes = require('./routes/crm.deal.routes');
const { startIoTSimulation } = require('./services/iot.service');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }
});

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(compression());
app.use(express.json());

// ============== SÉCURITÉ GLOBALE ==============
app.use(sanitizeInput);
app.use('/api/', apiLimiter);

// ============== DOCUMENTATION ==============
app.use('/', swaggerRoutes);

// Health check pour la production
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '2.1.0',
    uptime: process.uptime()
  });
});

// Inject Socket.io into requests
app.set('io', io);

// Routes CAFM
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/workorders', workOrderRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/leases', leaseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/cmms', cmmsRoutes);
app.use('/api/digitaltwin', digitalTwinRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/erp', erpRoutes);
app.use('/api/bim', bimRoutes);

// Sentry error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Error handling (Global)
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

// Routes CRM SaaS
app.use('/api/crm/auth', crmAuthRoutes);
app.use('/api/crm/contacts', crmContactRoutes);
app.use('/api/crm/deals', crmDealRoutes);

// SSE Events
const eventsRoutes = require('./routes/events.routes');
app.use('/api/crm', eventsRoutes);
global.broadcastSSE = eventsRoutes.broadcast;

// Billing Stripe (webhook DOIT être avant express.json pour recevoir raw body)
const billingRoutes = require('./routes/billing.routes');
app.use('/api/crm/billing', billingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// WebSocket
io.on('connection', (socket) => {
  console.log('Client connecté:', socket.id);
  socket.on('disconnect', () => console.log('Client déconnecté:', socket.id));
});

// Start IoT simulation (capteurs en temps réel)
startIoTSimulation(io);

const PORT = process.env.BACKEND_PORT || 8081;
server.listen(PORT, () => {
  console.log(`🚀 Serveur CAFM démarré sur le port ${PORT}`);
});
