import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { http } from '../api/client';
import { endpoints } from '../api/endpoints';
import { useAuth } from './AuthContext';

/**
 * PUBLIC_INTERFACE
 * ExpensesContext handles transaction data and CRUD operations.
 */
const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  // Call hooks only at the top level of the component
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (filters.from) query.set('from', String(filters.from));
      if (filters.to) query.set('to', String(filters.to));
      if (filters.category) query.set('category', String(filters.category));
      if (typeof filters.minAmount === 'number') query.set('minAmount', String(filters.minAmount));
      if (typeof filters.maxAmount === 'number') query.set('maxAmount', String(filters.maxAmount));
      const path = `${endpoints.expenses}?${query.toString()}`;
      const data = await http.get(path, { token });
      setExpenses(Array.isArray(data) ? data : data?.items || []);
    } catch (e) {
      setError(e?.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const created = await http.post(endpoints.expenses, payload, { token });
      // Optimistically update
      setExpenses((prev) => [created, ...prev]);
      return created;
    } catch (e) {
      setError(e?.message || 'Failed to add expense');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await http.put(endpoints.expenseById(id), payload, { token });
      setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      return updated;
    } catch (e) {
      setError(e?.message || 'Failed to update expense');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await http.del(endpoints.expenseById(id), { token });
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      return true;
    } catch (e) {
      setError(e?.message || 'Failed to delete expense');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = useMemo(
    () => ({
      expenses,
      loading,
      error,
      fetchExpenses,
      addExpense,
      updateExpense,
      deleteExpense,
    }),
    [expenses, loading, error]
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * Hook to access expenses context.
 */
export function useExpenses() {
  /** This is a public function. */
  const ctx = useContext(ExpensesContext);
  if (!ctx) throw new Error('useExpenses must be used within ExpensesProvider');
  return ctx;
}
