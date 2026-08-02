import { useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

/**
 * Modal de base réutilisable
 * @param {boolean} open - État d'ouverture
 * @param {function} onClose - Callback de fermeture
 * @param {string} title - Titre de la modal
 * @param {ReactNode} children - Contenu
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl'
 */
export default function Modal({ open, onClose, title, children, size = 'md', footer }) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className={clsx('bg-white rounded-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl', sizeClasses[size])}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
        {footer && <div className="p-6 border-t border-slate-200 flex justify-end gap-2 bg-slate-50/50">{footer}</div>}
      </div>
    </div>
  );
}
