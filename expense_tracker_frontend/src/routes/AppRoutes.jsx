import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Reports from '../pages/Reports';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * AppRoutes defines the application's routing, including authentication guards for protected routes.
 */
export default function AppRoutes() {
  /** This is a public function. */
  return (
    <Routes>
      <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
      <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
      <Route path="/" element={<Protected><Dashboard /></Protected>} />
      <Route path="/transactions" element={<Protected><Transactions /></Protected>} />
      <Route path="/reports" element={<Protected><Reports /></Protected>} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicOnly({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}
