import api from './api';

export const nexusApi = {
  // Public routes
  getPublicStats: async () => {
    const { data } = await api.get('/public/stats');
    return data;
  },
  getPublicPricing: async () => {
    const { data } = await api.get('/public/pricing');
    return data;
  },
  submitContactForm: async (contactData) => {
    const { data } = await api.post('/public/contact', contactData);
    return data;
  },
  registerDevice: async (registerData) => {
    const { data } = await api.post('/auth/register', registerData);
    return data;
  },
  googleLogin: async (idToken) => {
    const { data } = await api.post('/auth/google', { idToken });
    return data;
  },

  // IoT routes
  getSensors: async (type) => {
    const { data } = await api.get('/iot/sensors', { params: { type } });
    return data;
  },
  getNetworkTopology: async () => {
    const { data } = await api.get('/iot/network');
    return data;
  },

  // Systems routes
  getAccessControl: async () => {
    const { data } = await api.get('/systems/access');
    return data;
  },
  getHVAC: async () => {
    const { data } = await api.get('/systems/hvac');
    return data;
  },
  getElectrical: async () => {
    const { data } = await api.get('/systems/electrical');
    return data;
  },
  getParking: async () => {
    const { data } = await api.get('/systems/parking');
    return data;
  },
  getSpacesReservations: async () => {
    const { data } = await api.get('/systems/spaces');
    return data;
  },

  // KPI Dashboard routes
  getKPIs: async () => {
    const { data } = await api.get('/dashboard/kpis');
    return data;
  },
  getLiveStats: async () => {
    const { data } = await api.get('/dashboard/live');
    return data;
  }
};
