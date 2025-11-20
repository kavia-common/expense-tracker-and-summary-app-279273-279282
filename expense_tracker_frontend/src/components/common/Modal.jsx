import React, { useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * Accessible modal dialog.
 */
export default function Modal({ open, title, onClose, children }) {
  /** This is a public function. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 520,
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          borderRadius: 14,
          padding: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button aria-label="Close" onClick={onClose} className="btn btn-sm" style={{ borderRadius: 8 }}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
