import { useEffect } from 'react';

/**
 * Global keyboard shortcuts hook
 * Ctrl+K / Cmd+K → Command palette
 */
export function useKeyboardShortcuts(setPaletteOpen) {
  useEffect(() => {
    const handler = (e) => {
      // Ctrl/Cmd + K → Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [setPaletteOpen]);
}
