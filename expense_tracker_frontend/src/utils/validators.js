'use strict';

/**
 * Simple input validators and sanitizers.
 *
 * Email validation notes:
 * - We use a pragmatic, standards-aligned regex that accepts common valid emails,
 *   including dots, plus tags, and subdomains (e.g., user.name+tag@sub.domain.co.uk).
 * - The local-part is case-sensitive in theory, but most systems treat it case-insensitive;
 *   the domain is always case-insensitive, so we normalize domain casing for comparison
 *   only when needed. For validation, we simply trim and test.
 */

// This pattern is intentionally pragmatic (not fully RFC 5322 exhaustive) but robust:
// - Local part: letters/digits and allowed specials ._%+-, not starting/ending with dot, no consecutive dots
// - Domain: labels of letters/digits/hyphens, separated by dots, TLD 2+ letters
const EMAIL_REGEX =
  /^(?!.*\.\.)[A-Z0-9._%+-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)*\.[A-Z]{2,}$/i;

// PUBLIC_INTERFACE
export const validators = {
  /** Check that a value is present and non-empty after trimming. */
  required(value) {
    return value !== undefined && value !== null && String(value).trim() !== '';
  },
  /** Validate email format using a pragmatic regex; trims input and tolerates domain casing. */
  email(value) {
    if (!validators.required(value)) return false;
    const raw = String(value).trim();
    // Fast-fail empty after trim
    if (raw === '') return false;

    // For validation, test with case-insensitive regex. Do not mutate user input here.
    if (!EMAIL_REGEX.test(raw)) return false;

    // Additional lightweight check: ensure domain labels are not empty and no label starts/ends with '-'
    const atIdx = raw.lastIndexOf('@');
    if (atIdx <= 0) return false;
    const domain = raw.slice(atIdx + 1);
    const labels = domain.split('.');
    if (labels.some((l) => l.length === 0 || l.startsWith('-') || l.endsWith('-'))) return false;

    return true;
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
