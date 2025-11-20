import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { CATEGORIES } from '../../utils/constants';

/**
 * PUBLIC_INTERFACE
 * Filters for transactions list.
 */
export default function ExpenseFilters({ onApply }) {
  /** This is a public function. */
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    category: '',
    minAmount: '',
    maxAmount: '',
  });

  const apply = () => {
    const payload = {
      from: filters.from || undefined,
      to: filters.to || undefined,
      category: filters.category || undefined,
      minAmount: filters.minAmount ? Number(filters.minAmount) : undefined,
      maxAmount: filters.maxAmount ? Number(filters.maxAmount) : undefined,
    };
    onApply?.(payload);
  };

  const clear = () => {
    setFilters({ from: '', to: '', category: '', minAmount: '', maxAmount: '' });
    onApply?.({});
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 12 }}>
      <Input label="From" type="date" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} />
      <Input label="To" type="date" value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value })} />
      <Select label="Category" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} options={CATEGORIES} />
      <Input label="Min" type="number" step="0.01" value={filters.minAmount} onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })} />
      <Input label="Max" type="number" step="0.01" value={filters.maxAmount} onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })} />
      <div style={{ display: 'flex', gap: 8, alignItems: 'end' }}>
        <Button onClick={apply}>Apply</Button>
        <Button variant="secondary" onClick={clear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
