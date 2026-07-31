import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      
      login: async (email, password) => {
        set({ loading: true });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          set({ user: data.user, token: data.token, loading: false });
          return true;
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      mockLogin: () => {
        set({
          user: {
            id: 'mock-123',
            email: 'admin@cafm.com',
            firstName: 'Admin (Mock)',
            lastName: 'CAFM',
            role: 'ADMIN'
          },
          token: 'mock-jwt-token',
          loading: false
        });
      },
      
      logout: () => set({ user: null, token: null })
    }),
    { name: 'cafm-auth' }
  )
);
