import React from 'react';
import Container from '../components/layout/Container';
import SummaryCards from '../components/expenses/SummaryCards';
import Charts from '../components/expenses/Charts';
import Loader from '../components/common/Loader';
import Alert from '../components/common/Alert';
import { useExpenses } from '../context/ExpensesContext';

/**
 * PUBLIC_INTERFACE
 * Dashboard shows summary and charts.
 */
export default function Dashboard() {
  /** This is a public function. */
  const { expenses, loading, error } = useExpenses();

  return (
    <Container>
      <h2>Dashboard</h2>
      {loading && <Loader />}
      {error && <Alert message={error} />}
      <SummaryCards expenses={expenses} />
      <Charts expenses={expenses} />
    </Container>
  );
}
