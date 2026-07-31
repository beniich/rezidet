import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// CAFM Imports
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Spaces from './pages/Spaces';
import WorkOrders from './pages/WorkOrders';
import Analytics from './pages/Analytics';
import CMMS from './pages/CMMS';
import DigitalTwin from './pages/DigitalTwin';
import Notifications from './pages/Notifications';
import Tenants from './pages/Tenants';
import Exports from './pages/Exports';
import ERPIntegration from './pages/ERPIntegration';
import BIMViewer from './pages/BIMViewer';

// CRM Imports
import CRMLogin from './pages/crm/Login';
import CRMSignup from './pages/crm/Signup';
import CRMLayout from './components/crm/CRMLayout';
import CRMDashboard from './pages/crm/Dashboard';
import CRMContacts from './pages/crm/Contacts';
import CRMDeals from './pages/crm/Deals';
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
        {/* CAFM Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="spaces" element={<Spaces />} />
          <Route path="work-orders" element={<WorkOrders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="cmms" element={<CMMS />} />
          <Route path="digital-twin" element={<DigitalTwin />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="exports" element={<Exports />} />
          <Route path="erp-integration" element={<ERPIntegration />} />
          <Route path="bim-viewer" element={<BIMViewer />} />
        </Route>

        {/* CRM SaaS Routes */}
        <Route path="/crm/login" element={<CRMLogin />} />
        <Route path="/crm/signup" element={<CRMSignup />} />
        <Route path="/crm/screensaver" element={<ScreenSaver />} />
        <Route path="/crm" element={<CRMLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CRMDashboard />} />
          <Route path="contacts" element={<CRMContacts />} />
          <Route path="deals" element={<CRMDeals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
