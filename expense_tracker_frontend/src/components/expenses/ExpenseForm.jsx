import React, { useEffect, useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import Alert from '../common/Alert';
import { CATEGORIES } from '../../utils/constants';
import { validators, sanitizeString } from '../../utils/validators';

/**
 * PUBLIC_INTERFACE
 * ExpenseForm handles new/edit expense submission
 */
export default function ExpenseForm({ initial = null, onSubmit, onCancel, submitting = false, error }) {
  /** This is a public function. */
  const [form, setForm] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        amount: initial.amount != null ? String(initial.amount) : '',
        date: initial.date ? initial.date.slice(0, 10) : '',
        category: initial.category || '',
        notes: initial.notes || '',
      });
    }
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!validators.required(form.title)) e.title = 'Title is required';
    const amountNum = Number(form.amount);
    if (!validators.positiveNumber(amountNum)) e.amount = 'Enter a valid positive amount';
    if (!validators.date(form.date)) e.date = 'Enter a valid date';
    if (!validators.required(form.category)) e.category = 'Select a category';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      title: sanitizeString(form.title.trim()),
      amount: Number(form.amount),
      date: form.date,
      category: sanitizeString(form.category),
      notes: sanitizeString(form.notes.trim()),
    };
    await onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <Alert type="error" message={error} />}
      <Input
        label="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
        error={errors.title}
      />
      <Input
        label="Amount"
        type="number"
        step="0.01"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
        error={errors.amount}
      />
      <Input
        label="Date"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
        error={errors.date}
      />
      <Select
        label="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        options={CATEGORIES}
        required
        error={errors.category}
      />
      <Input
        label="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        placeholder="Optional"
      />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
