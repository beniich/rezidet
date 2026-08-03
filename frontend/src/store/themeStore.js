import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light', // default theme is light
      toggleTheme: () => set((state) => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nextTheme);
        return { theme: nextTheme };
      }),
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },
    }),
    { name: 'cafm-theme' }
  )
);
