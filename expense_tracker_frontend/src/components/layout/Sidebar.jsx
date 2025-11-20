import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation.
 */
export default function Sidebar() {
  /** This is a public function. */
  const linkStyle = ({ isActive }) => ({
    display: 'block',
    padding: '10px 12px',
    color: isActive ? 'var(--button-text)' : 'var(--text-primary)',
    background: isActive ? 'var(--color-secondary)' : 'transparent',
    textDecoration: 'none',
    borderRadius: 10,
  });

  return (
    <aside
      aria-label="Sidebar"
      style={{
        width: 240,
        padding: 16,
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
      }}
    >
      <h1 style={{ fontSize: 18, marginTop: 0, color: 'var(--text-primary)' }}>Expense Tracker</h1>
      <nav>
        <NavLink to="/" style={linkStyle} end>
          Dashboard
        </NavLink>
        <NavLink to="/transactions" style={linkStyle}>
          Transactions
        </NavLink>
        <NavLink to="/reports" style={linkStyle}>
          Reports
        </NavLink>
        <NavLink to="/profile" style={linkStyle}>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
