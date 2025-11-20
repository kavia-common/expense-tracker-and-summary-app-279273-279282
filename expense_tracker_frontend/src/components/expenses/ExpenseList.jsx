import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * PUBLIC_INTERFACE
 * List of expenses with edit/delete actions.
 */
export default function ExpenseList({ items = [], onEdit, onDelete }) {
  /** This is a public function. */
  if (!items.length) {
    return <div style={{ color: 'var(--text-primary)' }}>No transactions yet.</div>;
  }

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {items.map((item) => (
        <Card key={item.id}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 160px 200px', alignItems: 'center', gap: 8 }}>
            <div>
              <div style={{ fontWeight: 600 }}>{item.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{item.category}</div>
            </div>
            <div>{formatCurrency(item.amount)}</div>
            <div>{formatDate(item.date)}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => onEdit?.(item)}>
                Edit
              </Button>
              <Button variant="secondary" onClick={() => onDelete?.(item)}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
