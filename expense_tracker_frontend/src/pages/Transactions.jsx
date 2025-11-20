import React, { useMemo, useState } from 'react';
import Container from '../components/layout/Container';
import ExpenseFilters from '../components/expenses/ExpenseFilters';
import ExpenseList from '../components/expenses/ExpenseList';
import Modal from '../components/common/Modal';
import ExpenseForm from '../components/expenses/ExpenseForm';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Alert from '../components/common/Alert';
import { useExpenses } from '../context/ExpensesContext';

/**
 * PUBLIC_INTERFACE
 * Transactions page with filtering and CRUD.
 */
export default function Transactions() {
  /** This is a public function. */
  const { expenses, fetchExpenses, addExpense, updateExpense, deleteExpense, loading, error } = useExpenses();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [opError, setOpError] = useState('');

  const onApplyFilters = (filters) => {
    fetchExpenses(filters);
  };

  const onAdd = () => {
    setEditing(null);
    setOpError('');
    setOpen(true);
  };

  const onEdit = (item) => {
    setEditing(item);
    setOpError('');
    setOpen(true);
  };

  const onDelete = async (item) => {
    setOpError('');
    try {
      await deleteExpense(item.id);
    } catch (e) {
      setOpError(e?.message || 'Failed to delete');
    }
  };

  const handleSubmit = async (payload) => {
    try {
      if (editing) {
        await updateExpense(editing.id, payload);
      } else {
        await addExpense(payload);
      }
      setOpen(false);
      setEditing(null);
    } catch (e) {
      setOpError(e?.message || 'Failed to save');
    }
  };

  const sorted = useMemo(() => {
    return [...(expenses || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses]);

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Transactions</h2>
        <Button onClick={onAdd}>+ Add</Button>
      </div>
      {error && <Alert message={error} />}
      <ExpenseFilters onApply={onApplyFilters} />
      {loading ? <Loader /> : <ExpenseList items={sorted} onEdit={onEdit} onDelete={onDelete} />}
      <Modal open={open} title={editing ? 'Edit Transaction' : 'New Transaction'} onClose={() => setOpen(false)}>
        {opError && <Alert message={opError} />}
        <ExpenseForm initial={editing} onSubmit={handleSubmit} onCancel={() => setOpen(false)} submitting={loading} />
      </Modal>
    </Container>
  );
}
