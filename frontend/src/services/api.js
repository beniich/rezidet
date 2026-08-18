import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// ============== CONFIGURATION ==============
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

// ============== REQUEST INTERCEPTOR ==============
api.interceptors.request.use(
  (config) => {
    // Ajouter le token d'auth
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ajouter X-Request-ID pour le tracking
    config.headers['X-Request-ID'] = crypto.randomUUID();

    // Log en dev uniquement
    if (import.meta.env.DEV) {
      console.log(`📡 ${config.method.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============== RESPONSE INTERCEPTOR ==============
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error || error.message;

    if (import.meta.env.DEV) {
      console.error(`❌ ${status} ${error.config?.url}:`, message);
    }

    // 401: Token expiré → logout
    if (status === 401) {
      useAuthStore.getState().logout();
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // 403: Pas les permissions
    if (status === 403) {
      toast.error('Accès refusé');
    }

    // 429: Rate limit
    if (status === 429) {
      toast.error('Trop de requêtes, réessayez dans quelques secondes');
    }

    // 5xx: Erreur serveur
    if (status >= 500) {
      // Sentry capture automatique
      console.error('Server error:', error);
    }

    return Promise.reject(error);
  }
);

// Helper pour toast (lazy import)
import('react-hot-toast').then(({ default: toast }) => {
  api.interceptors.response.use(
    (r) => r,
    (err) => {
      const msg = err.response?.data?.error;
      if (msg && err.response?.status >= 400) {
        toast.error(msg);
      }
      return Promise.reject(err);
    }
  );
});

export default api;
