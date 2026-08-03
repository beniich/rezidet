import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useTenantStore = create(
  persist(
    (set, get) => ({
      tenant: null,
      loading: false,

      loadTenant: async () => {
        set({ loading: true });
        try {
          const { data } = await api.get('/tenants/me');
          set({ tenant: data, loading: false });
          // Apply primary color if defined in TenantConfig
          if (data?.tenantConfigs) {
            const colorConfig = data.tenantConfigs.find(c => c.key === 'primaryColor');
            if (colorConfig) {
              document.documentElement.style.setProperty('--accent-orange', colorConfig.value);
            }
          }
        } catch (err) {
          set({ loading: false });
        }
      },

      updateTenant: async (updates) => {
        try {
          const { data } = await api.put('/tenants/me', updates);
          set({ tenant: data });
          return data;
        } catch (err) {
          throw err;
        }
      },

      clearTenant: () => set({ tenant: null }),
    }),
    { name: 'cafm-tenant' }
  )
);
