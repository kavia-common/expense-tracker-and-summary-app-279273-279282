import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpensesProvider } from './context/ExpensesContext';
import AppRoutes from './routes/AppRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ExpensesProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ExpensesProvider>
    </AuthProvider>
  </React.StrictMode>
);
