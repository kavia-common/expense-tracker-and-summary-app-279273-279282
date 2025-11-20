import React, { useMemo } from 'react';
import Card from '../common/Card';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

/**
 * PUBLIC_INTERFACE
 * Placeholder charts for dashboard.
 */
export default function Charts({ expenses = [] }) {
  /** This is a public function. */
  const categoryData = useMemo(() => {
    const map = new Map();
    expenses.forEach((e) => {
      const key = e.category || 'Other';
      map.set(key, (map.get(key) || 0) + Number(e.amount || 0));
    });
    const labels = Array.from(map.keys());
    const values = Array.from(map.values());
    return { labels, values };
  }, [expenses]);

  const timeline = useMemo(() => {
    const map = new Map();
    expenses.forEach((e) => {
      const date = (e.date || '').slice(0, 10);
      map.set(date, (map.get(date) || 0) + Number(e.amount || 0));
    });
    const labels = Array.from(map.keys()).sort();
    const values = labels.map((d) => map.get(d));
    return { labels, values };
  }, [expenses]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <Card>
        <h3 style={{ marginTop: 0 }}>By Category</h3>
        <Doughnut
          data={{
            labels: categoryData.labels,
            datasets: [
              {
                data: categoryData.values,
                backgroundColor: ['#EC4899', '#8B5CF6', '#10B981', '#EF4444', '#60A5FA', '#F59E0B', '#34D399', '#A78BFA'],
              },
            ],
          }}
        />
      </Card>
      <Card>
        <h3 style={{ marginTop: 0 }}>Over Time</h3>
        <Line
          data={{
            labels: timeline.labels,
            datasets: [
              {
                label: 'Spending',
                data: timeline.values,
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139,92,246,0.2)',
              },
            ],
          }}
        />
      </Card>
    </div>
  );
}
