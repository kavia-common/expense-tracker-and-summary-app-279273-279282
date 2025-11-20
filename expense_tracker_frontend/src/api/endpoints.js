/**
 * Centralized endpoints map.
 */
export const endpoints = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  // Expenses
  expenses: '/expenses',
  expenseById: (id) => `/expenses/${encodeURIComponent(String(id))}`,
  // Reports
  reports: '/reports',
};
