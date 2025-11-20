import React from 'react';
import Container from '../components/layout/Container';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Profile page with user info.
 */
export default function Profile() {
  /** This is a public function. */
  const { user } = useAuth();
  return (
    <Container>
      <h2>Profile</h2>
      <Card>
        <div>Email: {user?.email}</div>
      </Card>
    </Container>
  );
}
