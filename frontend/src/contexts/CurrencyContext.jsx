import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

const EXCHANGE_RATES = {
  EUR: { symbol: '€', rate: 1, locale: 'fr-FR' },
  USD: { symbol: '$', rate: 1.10, locale: 'en-US' },
  GBP: { symbol: '£', rate: 0.85, locale: 'en-GB' }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() =>
    localStorage.getItem('cafm-currency') || 'EUR'
  );

  useEffect(() => {
    localStorage.setItem('cafm-currency', currency);
  }, [currency]);

  const format = (amountEur) => {
    const { rate, locale } = EXCHANGE_RATES[currency];
    const converted = amountEur * rate;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(converted);
  };

  const convert = (amountEur) => amountEur * EXCHANGE_RATES[currency].rate;
  const symbol = EXCHANGE_RATES[currency].symbol;

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert, symbol, rates: EXCHANGE_RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
