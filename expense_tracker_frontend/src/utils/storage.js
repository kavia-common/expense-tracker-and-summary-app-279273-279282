/**
 * Safe localStorage helpers. No secrets beyond short-lived tokens.
 */
const TOKEN_KEY = 'et_token';
const THEME_KEY = 'et_theme';

export const storage = {
  setToken(token) {
    if (!token || typeof token !== 'string') return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // ignore
    }
  },
  getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  clearToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // ignore
    }
  },
  setTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  },
  getTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  },
};
