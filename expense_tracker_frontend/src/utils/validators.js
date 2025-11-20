/**
 * Simple input validators and sanitizers.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validators = {
  required(value) {
    return value !== undefined && value !== null && String(value).trim() !== '';
  },
  email(value) {
    if (!validators.required(value)) return false;
    return EMAIL_REGEX.test(String(value).trim());
  },
  minLength(value, min) {
    return String(value || '').trim().length >= min;
  },
  number(value) {
    return typeof value === 'number' && !Number.isNaN(value);
  },
  positiveNumber(value) {
    return validators.number(value) && value > 0;
  },
  date(value) {
    const d = new Date(value);
    return !Number.isNaN(d.getTime());
  },
};

export function sanitizeString(input) {
  if (input === undefined || input === null) return '';
  return String(input).replace(/[<>]/g, '');
}
```

Explanation: Create formatters
````write file="expense-tracker-and-summary-app-279273-279282/expense_tracker_frontend/src/utils/formatters.js"
/**
 * Currency and date formatters
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number(amount) || 0);
  } catch {
    return `$${(Number(amount) || 0).toFixed(2)}`;
  }
};

export const formatDate = (d) => {
  try {
    const date = new Date(d);
    return new Intl.DateTimeFormat('en-US').format(date);
  } catch {
    return '';
  }
};
