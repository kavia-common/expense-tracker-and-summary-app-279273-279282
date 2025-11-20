import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { http } from '../api/client';
import { endpoints } from '../api/endpoints';
import { storage } from '../utils/storage';
import { applyTheme } from '../utils/theme';

/**
 * PUBLIC_INTERFACE
 * AuthContext provides user auth state and actions.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(storage.getToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [themeMode, setThemeMode] = useState(storage.getTheme() || 'light');

  useEffect(() => {
    applyTheme(themeMode);
    try {
      document.documentElement.setAttribute('data-theme', themeMode);
    } catch {
      // ignore
    }
    storage.setTheme(themeMode);
  }, [themeMode]);

  useEffect(() => {
    // Fetch current user if token present
    const init = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const me = await http.get(endpoints.me, { token });
        setUser(me || null);
      } catch {
        // token might be invalid - clear
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [token]);

  const login = async (email, password) => {
    if (!email || !password) throw new Error('Email and password are required.');
    setLoading(true);
    try {
      const res = await http.post(endpoints.login, { email: String(email).trim(), password: String(password) });
      const accessToken = res?.access_token || res?.token;
      if (accessToken) {
        setToken(accessToken);
        storage.setToken(accessToken);
      }
      setUser(res?.user || { email });
      return true;
    } catch (e) {
      throw new Error(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    if (!email || !password) throw new Error('Email and password are required.');
    setLoading(true);
    try {
      const res = await http.post(endpoints.register, { email: String(email).trim(), password: String(password) });
      const accessToken = res?.access_token || res?.token;
      if (accessToken) {
        setToken(accessToken);
        storage.setToken(accessToken);
      }
      setUser(res?.user || { email });
      return true;
    } catch (e) {
      throw new Error(e?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.clearToken();
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      themeMode,
      setThemeMode,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [token, user, loading, themeMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * Hook to access the auth context.
 */
export function useAuth() {
  /** This is a public function. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
