import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Alert component for errors or success messages.
 */
export default function Alert({ type = 'error', message }) {
  /** This is a public function. */
  if (!message) return null;
  const bg = type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)';
  const color = type === 'error' ? 'var(--color-error)' : 'var(--color-success)';
  return (
    <div role="alert" style={{ background: bg, color, padding: 10, borderRadius: 10, margin: '8px 0' }}>
      {message}
    </div>
  );
}
