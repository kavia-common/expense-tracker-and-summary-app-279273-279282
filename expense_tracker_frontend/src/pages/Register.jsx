import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { validators } from '../utils/validators';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Register page.
 */
export default function Register() {
  /** This is a public function. */
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validators.email(String(form.email).trim())) return setError('Enter a valid email');
    if (!validators.minLength(form.password, 6)) return setError('Password must be at least 6 characters');
    try {
      await register(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg-primary)' }}>
      <form onSubmit={handleSubmit} style={{ width: 360, background: 'var(--surface)', padding: 20, borderRadius: 14, border: '1px solid var(--border-color)' }}>
        <h2 style={{ marginTop: 0 }}>Create account</h2>
        {error && <Alert message={error} />}
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</Button>
        <div style={{ marginTop: 10 }}>
          Have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
