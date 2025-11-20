'use strict';

/**
 * Simple input validators and sanitizers.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// PUBLIC_INTERFACE
export const validators = {
  /** Check that a value is present and non-empty after trimming. */
  required(value) {
    return value !== undefined && value !== null && String(value).trim() !== '';
  },
  /** Validate email format using a conservative regex. */
  email(value) {
    if (!validators.required(value)) return false;
    return EMAIL_REGEX.test(String(value).trim());
  },
  /** Ensure value length is at least min characters when stringified and trimmed. */
  minLength(value, min) {
    return String(value ?? '').trim().length >= Number(min || 0);
  },
  /** Check value is a finite number (not NaN). */
  number(value) {
    return typeof value === 'number' && Number.isFinite(value);
  },
  /** Positive number (> 0). */
  positiveNumber(value) {
    return validators.number(value) && value > 0;
  },
  /** Validate date string can be parsed to a valid Date. */
  date(value) {
    const d = new Date(value);
    return !Number.isNaN(d.getTime());
  },
};

// PUBLIC_INTERFACE
export function sanitizeString(input) {
  /** Sanitize a string by removing angle brackets to mitigate basic HTML injection. */
  if (input === undefined || input === null) return '';
  return String(input).replace(/[<>]/g, '');
}
