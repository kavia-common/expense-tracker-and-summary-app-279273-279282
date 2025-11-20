import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Accessible select with label and error.
 */
export default function Select({ id, label, value, onChange, options = [], error, required = false }) {
  /** This is a public function. */
  const selectId = id || `select-${Math.random().toString(36).slice(2)}`;
  const describedBy = error ? `${selectId}-error` : undefined;

  return (
    <div style={{ marginBottom: 12 }}>
      {label && (
        <label htmlFor={selectId} style={{ display: 'block', marginBottom: 6, color: 'var(--text-primary)' }}>
          {label} {required ? '*' : ''}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        style={{
          width: '100%',
          border: '1px solid var(--border-color)',
          borderRadius: 10,
          padding: '10px 12px',
          background: 'var(--surface)',
          color: 'var(--text-primary)',
        }}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <div id={describedBy} role="alert" style={{ color: 'var(--color-error)', marginTop: 4, fontSize: 12 }}>
          {error}
        </div>
      )}
    </div>
  );
}
