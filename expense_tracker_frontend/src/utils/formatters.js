/**
 * PUBLIC_INTERFACE
 * Format a number as currency using Intl with sensible fallback.
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  /** This is a public function. */
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number(amount) || 0);
  } catch {
    const val = Number(amount);
    if (Number.isFinite(val)) return `$${val.toFixed(2)}`;
    return '$0.00';
  }
};

/**
 * PUBLIC_INTERFACE
 * Format a date value for display (YYYY-MM-DD -> localized).
 */
export const formatDate = (value, locale = 'en-US') => {
  /** This is a public function. */
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(locale).format(d);
  } catch {
    return '';
  }
};
