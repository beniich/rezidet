require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const prisma = require('./config/database');

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

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }));
app.use(express.json());

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
