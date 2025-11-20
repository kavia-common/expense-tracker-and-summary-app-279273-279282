import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * 404 Not Found page.
 */
export default function NotFound() {
  /** This is a public function. */
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg-primary)' }}>
      <div style={{ background: 'var(--surface)', padding: 20, borderRadius: 14, border: '1px solid var(--border-color)' }}>
        <h2 style={{ marginTop: 0 }}>Page not found</h2>
        <p>Go back to the <Link to="/">Dashboard</Link></p>
      </div>
    </div>
  );
}
