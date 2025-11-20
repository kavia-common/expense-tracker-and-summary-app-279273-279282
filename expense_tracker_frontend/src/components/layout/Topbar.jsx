import React from 'react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Topbar with theme toggle and auth actions.
 */
export default function Topbar() {
  /** This is a public function. */
  const { logout, user, themeMode, setThemeMode } = useAuth();

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <header
      style={{
        height: 64,
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        background: 'var(--surface)',
      }}
    >
      <div aria-live="polite" style={{ color: 'var(--text-primary)' }}>{user?.email}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={toggleTheme} variant="secondary" ariaLabel="Toggle theme">
          {themeMode === 'light' ? '🌙 Dark' : '☀️ Light'}
        </Button>
        <Button onClick={logout} ariaLabel="Logout">
          Logout
        </Button>
      </div>
    </header>
  );
}
