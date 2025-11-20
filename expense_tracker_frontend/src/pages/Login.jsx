import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { validators } from '../utils/validators';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Login page.
 */
export default function Login() {
  /** This is a public function. */
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validators.email(form.email)) return setError('Enter a valid email');
    if (!validators.minLength(form.password, 6)) return setError('Password must be at least 6 characters');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg-primary)' }}>
      <form onSubmit={handleSubmit} style={{ width: 360, background: 'var(--surface)', padding: 20, borderRadius: 14, border: '1px solid var(--border-color)' }}>
        <h2 style={{ marginTop: 0 }}>Welcome back</h2>
        {error && <Alert message={error} />}
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
        <div style={{ marginTop: 10 }}>
          No account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
