import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import Layout from './components/Layout';
import SpiderLogo from './components/SpiderLogo';
import { useState, useEffect } from 'react';
import { CommandPalette } from './components/ui/CommandPalette';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Spaces from './pages/Spaces';
import WorkOrders from './pages/WorkOrders';
import Maintenance from './pages/Maintenance';
import Analytics from './pages/Analytics';
import Leases from './pages/Leases';
import Settings from './pages/Settings';
import Contacts from './pages/crm/Contacts';
import Deals from './pages/crm/Deals';
import CMMS from './pages/CMMS';
import DigitalTwin from './pages/DigitalTwin';
import ERPIntegration from './pages/ERPIntegration';
import BIMViewer from './pages/BIMViewer';
import Notifications from './pages/Notifications';
import Exports from './pages/Exports';
import Tenants from './pages/Tenants';
import AIAssistant from './pages/AIAssistant';
import ScreenSaver from './pages/crm/ScreenSaver';
import OrganizationSettings from './pages/OrganizationSettings';
import BillingSettings from './pages/BillingSettings';
import Marketplace from './pages/Marketplace';
import EnterpriseQuote from './pages/EnterpriseQuote';
import VendorDashboard from './pages/VendorDashboard';
import LicensesAdmin from './pages/LicensesAdmin';

// Web3
import Staking from './pages/Staking';
import DAO from './pages/DAO';
import Launchpad from './pages/Launchpad';
import OracleDashboard from './pages/OracleDashboard';
import Bridge from './pages/Bridge';
import Perpetuals from './pages/Perpetuals';
import Options from './pages/Options';

// Anciennes Pages Phase 1 (Publiques) - SUSPENDUES
// import SecureLogin from './pages/SecureLogin';
import Register from './pages/Register';
// import SiteApp from './new-site/SiteApp';
// import Mission from './pages/Mission';
// import Pricing from './pages/Pricing';
// import HelpCenter from './pages/HelpCenter';
// import ContactExperts from './pages/ContactExperts';
// import SecurityNews from './pages/SecurityNews';
// import SystemArchitecture from './pages/SystemArchitecture';

// Anciennes Pages Phase 3 (Variantes Home) - SUSPENDUES
// import HomePage1 from './pages/HomePage1';
// ... (HomePage1 to 20 commented out)
// import HomePage20 from './pages/HomePage20';

import SovereignApp from './sovereign-site/App';

const PrivateRoute = ({ children }) => {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" />;
};

function AppContent() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { theme } = useThemeStore();
  useKeyboardShortcuts(setPaletteOpen);

  // Apply theme on every render
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Toaster position="top-right" />
      <OfflineIndicator />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      {/* Hint shortcut in TopBar area */}
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Pages Publiques (Phase 1) - SUSPENDUES */}
        {/* <Route path="/auth/login" element={<SecureLogin />} /> */}
        <Route path="/auth/register" element={<Register />} />
        {/* <Route path="/landing" element={<SiteApp />} />
        <Route path="/about" element={<Mission />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<HelpCenter />} />
        <Route path="/contact" element={<ContactExperts />} />
        <Route path="/security-news" element={<SecurityNews />} />
        <Route path="/architecture" element={<SystemArchitecture />} /> */}

        {/* Variantes Home — Pages Publiques (Phase 3) - SUSPENDUES */}
        {/* <Route path="/home/:id" element={<HomePageX />} /> */}

        {/* NOUVEAU SITE SOVEREIGN */}
        <Route path="/" element={<SovereignApp />} />
        <Route path="/landing" element={<SovereignApp />} />
        <Route path="/site" element={<SovereignApp />} />
        <Route path="/enterprise" element={<EnterpriseQuote />} />

        {/* DASHBOARD PROTEGE */}
        <Route path="/dashboard" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          
          {/* Assets & Operations */}
          <Route path="assets" element={<Assets />} />
          <Route path="spaces" element={<Spaces />} />
          <Route path="work-orders" element={<WorkOrders />} />
          <Route path="maintenance" element={<Maintenance />} />
          
          {/* CRM */}
          <Route path="contacts" element={<Contacts />} />
          <Route path="deals" element={<Deals />} />
          
          {/* CMMS / ERP / BIM */}
          <Route path="cmms" element={<CMMS />} />
          <Route path="digital-twin" element={<DigitalTwin />} />
          <Route path="bim" element={<BIMViewer />} />
          <Route path="erp" element={<ERPIntegration />} />
          
          {/* Analytics & Reports */}
          <Route path="analytics" element={<Analytics />} />
          <Route path="exports" element={<Exports />} />
          <Route path="notifications" element={<Notifications />} />
          
          {/* Admin */}
          <Route path="leases" element={<Leases />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="profile" element={<Settings />} />
          
          {/* Display & System */}
          <Route path="screensaver" element={<ScreenSaver />} />
          <Route path="settings" element={<OrganizationSettings />} />
          <Route path="billing" element={<BillingSettings />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="vendor" element={<VendorDashboard />} />
          <Route path="admin/licenses" element={<LicensesAdmin />} />
          
          {/* Web3 / Crypto */}
          <Route path="staking" element={<Staking />} />
          <Route path="dao" element={<DAO />} />
          <Route path="launchpad" element={<Launchpad />} />
          <Route path="oracle" element={<OracleDashboard />} />
          <Route path="bridge" element={<Bridge />} />
          <Route path="perpetuals" element={<Perpetuals />} />
          <Route path="options" element={<Options />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
