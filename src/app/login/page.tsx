'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const { loading, requireNoAuth } = useAuth();

  useEffect(() => {
    requireNoAuth();
  }, [requireNoAuth]);

  if (loading) return null;

  return <LoginForm />;
}
