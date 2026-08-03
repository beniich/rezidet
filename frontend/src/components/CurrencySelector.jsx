import { Globe } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

export default function CurrencySelector({ className = '' }) {
  const { currency, setCurrency, rates } = useCurrency();

  const options = [
    { value: 'EUR', label: '🇪🇺 EUR (€)' },
    { value: 'USD', label: '🇺🇸 USD ($)' },
    { value: 'GBP', label: '🇬🇧 GBP (£)' }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-4 h-4 text-[var(--color-muted)]" />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="px-3 py-1.5 border border-[var(--color-border)] rounded-lg text-sm bg-[var(--color-surface)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-orange-500 transition cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
