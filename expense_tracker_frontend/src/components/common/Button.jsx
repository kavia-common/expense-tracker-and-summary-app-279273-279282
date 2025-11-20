import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Accessible button with variants and sizes.
 */
export default function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  ariaLabel,
}) {
  /** This is a public function. */
  const className = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : 'btn-md',
  ].join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      disabled={disabled}
      style={{
        background: variant === 'primary' ? 'var(--button-bg)' : 'transparent',
        color: variant === 'primary' ? 'var(--button-text)' : 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: size === 'lg' ? '12px 18px' : size === 'sm' ? '6px 10px' : '10px 14px',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}
