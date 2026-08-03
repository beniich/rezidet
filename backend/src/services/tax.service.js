class TaxService {
  TAX_RATES = {
    FR: { type: 'VAT', standard: 20, reduced: [10, 5.5, 2.1], zero: 0 },
    DE: { type: 'VAT', standard: 19, reduced: [7], zero: 0 },
    ES: { type: 'VAT', standard: 21, reduced: [10, 4], zero: 0 },
    IT: { type: 'VAT', standard: 22, reduced: [10, 5, 4], zero: 0 },
    NL: { type: 'VAT', standard: 21, reduced: [9], zero: 0 },
    GB: { type: 'VAT', standard: 20, reduced: [5, 0], zero: 0 },
    CH: { type: 'VAT', standard: 7.7, reduced: [3.7, 2.5], zero: 0 },
    US: { type: 'SALES_TAX', standard: 0, state: 'variable' },
    CA: { type: 'GST', standard: 5, hst: 13, zero: 0 }
  };

  getTaxRate(country, type = 'standard') {
    const rates = this.TAX_RATES[country];
    if (!rates) return { rate: 20, type: 'VAT', country };
    if (type === 'reduced' && rates.reduced?.length > 0) return { rate: rates.reduced[0], type: rates.type, country };
    if (country === 'US') return { rate: 0, type: 'SALES_TAX', country, note: 'Calcul par état requis' };
    return { rate: rates.standard, type: rates.type, country };
  }

  isEUCountry(country) {
    const eu = ['FR', 'DE', 'ES', 'IT', 'NL', 'BE', 'PT', 'IE', 'AT', 'FI', 'SE', 'DK', 'PL', 'CZ', 'HU', 'RO', 'BG', 'GR', 'HR', 'SK', 'SI', 'LT', 'LV', 'EE', 'CY', 'MT', 'LU'];
    return eu.includes(country);
  }

  async isVATApplicable(sellerCountry, buyerCountry, buyerVATNumber) {
    if (sellerCountry !== buyerCountry && this.isEUCountry(sellerCountry) && this.isEUCountry(buyerCountry)) {
      if (buyerVATNumber) return { applicable: false, rate: 0, reverseCharge: true };
    }
    if (!this.isEUCountry(sellerCountry) || !this.isEUCountry(buyerCountry)) {
      return { applicable: false, rate: 0, note: 'Export hors UE' };
    }
    return { applicable: true, rate: this.TAX_RATES[sellerCountry]?.standard || 20 };
  }

  async calculateInvoiceTax({ amount, sellerCountry, buyerCountry, buyerVATNumber, productType = 'standard' }) {
    const taxInfo = await this.isVATApplicable(sellerCountry, buyerCountry, buyerVATNumber);
    let rate = 0, type = 'VAT', note = '';

    if (taxInfo.applicable) {
      const rates = this.TAX_RATES[sellerCountry];
      if (productType === 'education' && rates?.reduced?.length > 0) {
        rate = rates.reduced[1] || rates.reduced[0];
        note = 'Taux réduit';
      } else {
        rate = rates?.standard || 20;
      }
      type = rates?.type || 'VAT';
    } else if (taxInfo.reverseCharge) {
      rate = 0; note = 'Autoliquidation (reverse charge)';
    } else if (taxInfo.note) {
      note = taxInfo.note;
    }

    const taxAmount = amount * (rate / 100);
    return {
      subtotal: amount, taxRate: rate, taxType: type,
      taxAmount: Math.round(taxAmount * 100) / 100,
      totalAmount: Math.round((amount + taxAmount) * 100) / 100,
      reverseCharge: taxInfo.reverseCharge || false, note, buyerCountry, sellerCountry
    };
  }

  async validateVATNumber(country, vatNumber) {
    if (!this.isEUCountry(country)) return { valid: false, reason: 'Numéro TVA non applicable' };
    try {
      const resp = await fetch(`https://ec.europa.eu/taxation_customs/vies/rest/api/check/${country}/${vatNumber}`);
      const data = await resp.json();
      return { valid: data.valid === true, country, vatNumber, name: data.name || '', address: data.address || '' };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  }
}

module.exports = new TaxService();
