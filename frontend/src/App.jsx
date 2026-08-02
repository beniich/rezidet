import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import SpiderLogo from './components/SpiderLogo';

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

// Nouvelles Pages Phase 1 (Publiques)
import SecureLogin from './pages/SecureLogin';
import Register from './pages/Register';
import LandingPageNew from './pages/LandingPageNew';
import Mission from './pages/Mission';
import Pricing from './pages/Pricing';
import HelpCenter from './pages/HelpCenter';
import ContactExperts from './pages/ContactExperts';
import SecurityNews from './pages/SecurityNews';
import SystemArchitecture from './pages/SystemArchitecture';

// Nouvelles Pages Phase 3 (Variantes Home)
import HomePage1 from './pages/HomePage1';
import HomePage2 from './pages/HomePage2';
import HomePage3 from './pages/HomePage3';
import HomePage4 from './pages/HomePage4';
import HomePage5 from './pages/HomePage5';
import HomePage6 from './pages/HomePage6';
import HomePage7 from './pages/HomePage7';
import HomePage8 from './pages/HomePage8';
import HomePage9 from './pages/HomePage9';
import HomePage10 from './pages/HomePage10';
import HomePage11 from './pages/HomePage11';
import HomePage12 from './pages/HomePage12';
import HomePage13 from './pages/HomePage13';
import HomePage14 from './pages/HomePage14';
import HomePage15 from './pages/HomePage15';
import HomePage16 from './pages/HomePage16';
import HomePage17 from './pages/HomePage17';
import HomePage18 from './pages/HomePage18';
import HomePage19 from './pages/HomePage19';
import HomePage20 from './pages/HomePage20';

const PrivateRoute = ({ children }) => {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Pages Publiques (Phase 1) */}
        <Route path="/auth/login" element={<SecureLogin />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/landing" element={<LandingPageNew />} />
        <Route path="/about" element={<Mission />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<HelpCenter />} />
        <Route path="/contact" element={<ContactExperts />} />
        <Route path="/security-news" element={<SecurityNews />} />
        <Route path="/architecture" element={<SystemArchitecture />} />

        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Variantes Home (Phase 3) */}
          <Route path="home/1" element={<HomePage1 />} />
          <Route path="home/2" element={<HomePage2 />} />
          <Route path="home/3" element={<HomePage3 />} />
          <Route path="home/4" element={<HomePage4 />} />
          <Route path="home/5" element={<HomePage5 />} />
          <Route path="home/6" element={<HomePage6 />} />
          <Route path="home/7" element={<HomePage7 />} />
          <Route path="home/8" element={<HomePage8 />} />
          <Route path="home/9" element={<HomePage9 />} />
          <Route path="home/10" element={<HomePage10 />} />
          <Route path="home/11" element={<HomePage11 />} />
          <Route path="home/12" element={<HomePage12 />} />
          <Route path="home/13" element={<HomePage13 />} />
          <Route path="home/14" element={<HomePage14 />} />
          <Route path="home/15" element={<HomePage15 />} />
          <Route path="home/16" element={<HomePage16 />} />
          <Route path="home/17" element={<HomePage17 />} />
          <Route path="home/18" element={<HomePage18 />} />
          <Route path="home/19" element={<HomePage19 />} />
          <Route path="home/20" element={<HomePage20 />} />

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
          <Route path="settings" element={<Settings />} />
          
          {/* Display */}
          <Route path="screensaver" element={<ScreenSaver />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

