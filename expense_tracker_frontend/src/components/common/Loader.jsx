import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Simple loader spinner.
 */
export default function Loader({ label = 'Loading...' }) {
  /** This is a public function. */
  return (
    <div role="status" aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
      <style>{`
        .spinner {
          width: 16px;
          height: 16px;
          border: 3px solid var(--border-color);
          border-top-color: var(--color-secondary);
          border-radius: 50%;
          display: inline-block;
          animation: spin .8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
