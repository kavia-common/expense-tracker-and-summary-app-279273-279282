import React, { useMemo } from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatters';

/**
 * PUBLIC_INTERFACE
 * Summary cards for totals and categories.
 */
export default function SummaryCards({ expenses = [] }) {
  /** This is a public function. */
  const { total, count, avg } = useMemo(() => {
    const total = expenses.reduce((acc, e) => acc + Number(e.amount || 0), 0);
    const count = expenses.length;
    const avg = count ? total / count : 0;
    return { total, count, avg };
  }, [expenses]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginBottom: 12 }}>
      <Card>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Total Spent</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{formatCurrency(total)}</div>
      </Card>
      <Card>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Transactions</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{count}</div>
      </Card>
      <Card>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Average</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{formatCurrency(avg)}</div>
      </Card>
    </div>
  );
}
