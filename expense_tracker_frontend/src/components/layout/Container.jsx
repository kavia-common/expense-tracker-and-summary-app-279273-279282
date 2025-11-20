import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * PUBLIC_INTERFACE
 * App layout with sidebar and topbar.
 */
export default function Container({ children }) {
  /** This is a public function. */
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <main style={{ padding: 16 }}>{children}</main>
      </div>
    </div>
  );
}
