import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Text input with label and error support.
 */
export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  min,
  max,
  step,
}) {
  /** This is a public function. */
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
  const describedBy = error ? `${inputId}-error` : undefined;

  return (
    <div style={{ marginBottom: 12 }}>
      {label && (
        <label htmlFor={inputId} style={{ display: 'block', marginBottom: 6, color: 'var(--text-primary)' }}>
          {label} {required ? '*' : ''}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        min={min}
        max={max}
        step={step}
        style={{
          width: '100%',
          border: '1px solid var(--border-color)',
          borderRadius: 10,
          padding: '10px 12px',
          background: 'var(--surface)',
          color: 'var(--text-primary)',
        }}
      />
      {error && (
        <div id={describedBy} role="alert" style={{ color: 'var(--color-error)', marginTop: 4, fontSize: 12 }}>
          {error}
        </div>
      )}
    </div>
  );
}
