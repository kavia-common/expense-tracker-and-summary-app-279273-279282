import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Simple card wrapper.
 */
export default function Card({ children, style }) {
  /** This is a public function. */
  return (
    <div
      style={{
        background: 'var(--surface)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 14,
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
