'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  const { loading, requireNoAuth } = useAuth();

  useEffect(() => {
    requireNoAuth();
  }, [requireNoAuth]);

  if (loading) return null;

  return <SignupForm />;
}
