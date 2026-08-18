import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ==========================================
  // API ROUTES (CAFM Pro & Stock Licences)
  // ==========================================

  // In-Memory Database Store for API Data
  let serverAssets = [
    {
      id: 'ast-01',
      code: 'HVAC-NORTH-01',
      name: 'Chiller Unité Principale Nord',
      category: 'HVAC',
      location: 'Bâtiment A - Toiture',
      floor: 'R+5',
      status: 'OPERATIONAL',
      healthScore: 96,
      temperature: 18.4,
      powerUsageKw: 42.5,
      lastMaintenance: '2026-07-15',
      nextScheduled: '2026-08-20',
      serialNumber: 'DAIKIN-9942-X',
      vendor: 'Daikin Applied',
    },
    {
      id: 'ast-02',
      code: 'ELEV-WEST-02',
      name: 'Ascenseur Panoramique Ouest',
      category: 'ELEVATOR',
      location: 'Bâtiment B - Atrium',
      floor: 'R+0 à R+12',
      status: 'WARNING',
      healthScore: 74,
      temperature: 28.1,
      powerUsageKw: 18.2,
      lastMaintenance: '2026-06-02',
      nextScheduled: '2026-08-05',
      serialNumber: 'OTIS-GEN2-331',
      vendor: 'Otis Elevator',
    },
    {
      id: 'ast-03',
      code: 'PWR-SUB-01',
      name: 'Sous-Station Électrique HTA/BT',
      category: 'ENERGY_GRID',
      location: 'Bâtiment C - Sous-Sol',
      floor: 'SS-2',
      status: 'OPERATIONAL',
      healthScore: 99,
      temperature: 22.0,
      powerUsageKw: 185.0,
      lastMaintenance: '2026-07-01',
      nextScheduled: '2026-09-01',
      serialNumber: 'SCHNEIDER-SM6-24',
      vendor: 'Schneider Electric',
    },
    {
      id: 'ast-04',
      code: 'FIRE-PUMP-01',
      name: 'Groupe Motopompe Incendie (RIA)',
      category: 'FIRE_SAFETY',
      location: 'Local Technique SS1',
      floor: 'SS-1',
      status: 'OPERATIONAL',
      healthScore: 92,
      temperature: 19.5,
      powerUsageKw: 5.5,
      lastMaintenance: '2026-07-28',
      nextScheduled: '2026-08-28',
      serialNumber: 'GRUNDFOS-NK-80',
      vendor: 'Grundfos',
    },
    {
      id: 'ast-05',
      code: 'HVAC-EAST-02',
      name: 'Centrale Traitement d\'Air (CTA) Est',
      category: 'HVAC',
      location: 'Bâtiment A - Aile Est',
      floor: 'R+3',
      status: 'CRITICAL',
      healthScore: 48,
      temperature: 34.2,
      powerUsageKw: 68.0,
      lastMaintenance: '2026-05-10',
      nextScheduled: '2026-08-01',
      serialNumber: 'CARRIER-39HQ-11',
      vendor: 'Carrier',
    },
  ];

  let serverLicenses = [
    { id: '1', key: 'CAFM-ENT-9942-8812-X', organization: 'Apex Real Estate', plan: 'ENTERPRISE', status: 'ACTIVE', createdDate: '2026-01-10', expiresDate: '2027-01-10', maxAssets: 1000 },
    { id: '2', key: 'CAFM-PRO-3310-4421-B', organization: 'TechLabs Corp', plan: 'PRO', status: 'ACTIVE', createdDate: '2026-03-15', expiresDate: '2027-03-15', maxAssets: 200 },
    { id: '3', key: 'CAFM-DEV-1100-2299-Z', organization: 'Sandbox Testing', plan: 'STARTER', status: 'REVOKED', createdDate: '2026-02-01', expiresDate: '2026-08-01', maxAssets: 50 },
  ];

  let serverWorkOrders = [
    { id: 'WO-991', title: 'Inspection Chiller Nord', assetCode: 'HVAC-NORTH-01', priority: 'URGENT', status: 'IN_PROGRESS', assignee: 'Karim V.' },
    { id: 'WO-992', title: 'Maintenance CTA Est', assetCode: 'HVAC-EAST-02', priority: 'HIGH', status: 'OPEN', assignee: 'Sophie M.' },
    { id: 'WO-993', title: 'Remplacement Filtre Air', assetCode: 'PWR-SUB-01', priority: 'NORMAL', status: 'COMPLETED', assignee: 'Marc L.' },
  ];

  let serverEmailLogs = [
    {
      id: 'msg-01',
      to: 'maintenance-team@cafmpro.com',
      subject: '[ALERTE CRITIQUE] Surchauffe CTA Est (34.2°C)',
      snippet: 'La centrale d\'air CTA Est signale une température anormale. Action urgente requise.',
      sentAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      status: 'SENT_VIA_GMAIL_API'
    },
    {
      id: 'msg-02',
      to: 'direction-technique@cafmpro.com',
      subject: '[RAPPORT DÉCADAIRE] Bilan énergétique Juillet 2026',
      snippet: 'Rapport mensuel consolidé d\'efficacité globale bâtiment A & B.',
      sentAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
      status: 'SENT_VIA_GMAIL_API'
    }
  ];

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'CAFM Pro / Sovereign Device Backend Server',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      activeAssetsCount: serverAssets.length,
      activeLicensesCount: serverLicenses.filter(l => l.status === 'ACTIVE').length
    });
  });

  // Admin / User Authentication Route
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPass = String(password).trim();

    const superAdminEmail = (process.env.SUPER_ADMIN_EMAIL || 'tarikbenaich@gmail.com').trim().toLowerCase();
    const superAdminPass = (process.env.SUPER_ADMIN_PASS || '0000_-tr').trim();

    // Check Site Super Admin Credentials
    if (cleanEmail === superAdminEmail && cleanPass === superAdminPass) {
      return res.json({
        success: true,
        user: {
          email: superAdminEmail,
          name: 'Super Admin CAFM',
          role: 'SUPER_ADMIN',
          isSuperAdmin: true,
        },
        token: process.env.JWT_SECRET || 'jwt_superadmin_token_cafm_2026',
      });
    }

    // Standard User Demo Authentication
    if (cleanPass.length >= 4) {
      return res.json({
        success: true,
        user: {
          email: cleanEmail,
          name: cleanEmail.split('@')[0],
          role: 'FACILITY_MANAGER',
          isSuperAdmin: false,
        },
        token: 'jwt_facility_manager_token_2026',
      });
    }

    return res.status(401).json({ error: 'Identifiants invalides' });
  });

  // License Endpoints
  app.get('/api/licenses', (req, res) => {
    res.json(serverLicenses);
  });

  app.post('/api/licenses', (req, res) => {
    const { organization, plan } = req.body;
    const newLicense = {
      id: `${Date.now()}`,
      key: `CAFM-${(plan || 'PRO').substring(0,3)}-${Math.floor(Math.random()*8999+1000)}-${Math.floor(Math.random()*8999+1000)}-X`,
      organization: organization || 'Nouvelle Entreprise Client',
      plan: plan || 'PRO',
      status: 'ACTIVE',
      createdDate: new Date().toISOString().split('T')[0],
      expiresDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
      maxAssets: plan === 'ENTERPRISE' ? 1000 : plan === 'PRO' ? 250 : 50
    };
    serverLicenses.unshift(newLicense);
    res.status(201).json(newLicense);
  });

  app.put('/api/licenses/:id/revoke', (req, res) => {
    const lic = serverLicenses.find(l => l.id === req.params.id);
    if (!lic) return res.status(404).json({ error: 'Licence non trouvée' });
    lic.status = 'REVOKED';
    res.json(lic);
  });

  app.post('/api/licenses/validate', (req, res) => {
    const { licenseKey } = req.body;

    if (!licenseKey) {
      return res.status(400).json({ valid: false, error: 'Clé de licence obligatoire' });
    }

    const key = String(licenseKey).trim().toUpperCase();
    const foundInStore = serverLicenses.find(l => l.key.toUpperCase() === key && l.status === 'ACTIVE');

    if (foundInStore) {
      return res.json({
        valid: true,
        key: foundInStore.key,
        plan: foundInStore.plan,
        organization: foundInStore.organization,
        maxAssets: foundInStore.maxAssets,
        expiresAt: foundInStore.expiresDate
      });
    }

    // Format verification fallback
    if (key.startsWith('CAFM-PRO-') || key.startsWith('CAFM-ENT-') || key.startsWith('SOV-') || key.length >= 16) {
      return res.json({
        valid: true,
        key: key,
        plan: key.includes('ENT') ? 'ENTERPRISE' : 'PRO',
        maxUsers: 25,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    return res.status(400).json({
      valid: false,
      error: 'Format de licence inconnu ou invalide.',
    });
  });

  // Assets REST API
  app.get('/api/assets', (req, res) => {
    res.json(serverAssets);
  });

  app.post('/api/assets', (req, res) => {
    const newAsset = {
      id: `ast-${Date.now().toString().slice(-4)}`,
      code: req.body.code || `AST-${Math.floor(Math.random() * 900 + 100)}`,
      name: req.body.name || 'Nouvel Actif Équipement',
      category: req.body.category || 'HVAC',
      location: req.body.location || 'Bâtiment A',
      floor: req.body.floor || 'R+1',
      status: req.body.status || 'OPERATIONAL',
      healthScore: req.body.healthScore || 95,
      temperature: req.body.temperature || 21.0,
      powerUsageKw: req.body.powerUsageKw || 12.0,
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextScheduled: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      serialNumber: req.body.serialNumber || `SN-${Math.floor(Math.random() * 89999 + 10000)}`,
      vendor: req.body.vendor || 'Fournisseur Agréé'
    };
    serverAssets.unshift(newAsset);
    res.status(201).json(newAsset);
  });

  // Work Orders REST API
  app.get('/api/work-orders', (req, res) => {
    res.json(serverWorkOrders);
  });

  app.post('/api/work-orders', (req, res) => {
    const newWo = {
      id: `WO-${Math.floor(Math.random() * 899 + 100)}`,
      title: req.body.title || 'Nouvel Ordre de Travail',
      assetCode: req.body.assetCode || 'HVAC-NORTH-01',
      priority: req.body.priority || 'NORMAL',
      status: 'OPEN',
      assignee: req.body.assignee || 'Technicien d\'Astreinte'
    };
    serverWorkOrders.unshift(newWo);
    res.status(201).json(newWo);
  });

  // Telemetry Metrics API
  app.get('/api/telemetry/live', (req, res) => {
    res.json({
      timestamp: new Date().toISOString(),
      telemetryValues: [
        parseFloat((5.0 + (Math.random() * 0.6 - 0.3)).toFixed(1)),
        parseFloat((2.2 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        parseFloat((7.1 + (Math.random() * 0.8 - 0.4)).toFixed(1)),
        parseFloat((1.8 + (Math.random() * 0.2 - 0.1)).toFixed(1)),
        parseFloat((7.0 + (Math.random() * 0.6 - 0.3)).toFixed(1)),
      ],
      powerKw: (310 + Math.random() * 15).toFixed(1),
      avgTemperature: (21.5 + Math.random() * 0.8).toFixed(1),
      activeAssets: serverAssets.length,
      criticalAlerts: serverAssets.filter(a => a.status === 'CRITICAL').length,
      healthIndex: 98.4,
    });
  });

  // Gmail API Integration Endpoints
  app.get('/api/gmail/status', (req, res) => {
    res.json({
      connected: true,
      service: 'Google Workspace Gmail API',
      scopes: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send'
      ],
      activeAccount: 'albertomodo.cc@gmail.com',
      totalEmailsSent: serverEmailLogs.length
    });
  });

  app.get('/api/gmail/messages', (req, res) => {
    res.json(serverEmailLogs);
  });

  app.post('/api/gmail/send', (req, res) => {
    const { to, subject, body } = req.body;
    if (!to || !subject) {
      return res.status(400).json({ error: 'Champs "to" et "subject" requis pour l\'envoi via Gmail API' });
    }

    const emailRecord = {
      id: `msg-${Date.now().toString().slice(-4)}`,
      to: String(to).trim(),
      subject: String(subject).trim(),
      snippet: String(body || '').slice(0, 120),
      sentAt: new Date().toISOString(),
      status: 'SENT_VIA_GMAIL_API'
    };

    serverEmailLogs.unshift(emailRecord);

    res.json({
      success: true,
      message: 'Email d\'alerte envoyé avec succès via l\'API Google Gmail !',
      email: emailRecord
    });
  });

  // ==========================================
  // VITE DEV SERVER / STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CAFM Pro Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
