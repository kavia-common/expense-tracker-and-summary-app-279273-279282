/**
 * Theme utilities reflecting "Ocean Professional" playful theme.
 * Applies CSS variables to documentElement.
 */
const palette = {
  primary: '#EC4899',
  secondary: '#8B5CF6',
  success: '#10B981',
  error: '#EF4444',
  background: '#FDF2F8',
  surface: '#FFFFFF',
  text: '#374151',
};

export function applyTheme(mode = 'light') {
  const root = document.documentElement;
  if (!root) return;
  // common tokens
  root.style.setProperty('--color-primary', palette.primary);
  root.style.setProperty('--color-secondary', palette.secondary);
  root.style.setProperty('--color-success', palette.success);
  root.style.setProperty('--color-error', palette.error);
  root.style.setProperty('--color-text', palette.text);

  // surfaces based on mode
  if (mode === 'dark') {
    root.style.setProperty('--bg-primary', '#0f172a');
    root.style.setProperty('--bg-secondary', '#111827');
    root.style.setProperty('--surface', '#1f2937');
    root.style.setProperty('--text-primary', '#f9fafb');
    root.style.setProperty('--border-color', '#374151');
    root.style.setProperty('--button-bg', palette.secondary);
    root.style.setProperty('--button-text', '#ffffff');
  } else {
    root.style.setProperty('--bg-primary', palette.background);
    root.style.setProperty('--bg-secondary', '#F5F3FF');
    root.style.setProperty('--surface', palette.surface);
    root.style.setProperty('--text-primary', palette.text);
    root.style.setProperty('--border-color', '#e5e7eb');
    root.style.setProperty('--button-bg', palette.primary);
    root.style.setProperty('--button-text', '#ffffff');
  }
}
