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
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
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
