'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import SignupForm from '@/components/auth/SignupForm';
import SplashScreen from '@/components/shared/SplashScreen';

export default function SignupPage() {
  const { session, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && session) {
      router.push('/dashboard');
    }
  }, [mounted, loading, session, router]);

  if (loading) return <SplashScreen />;

  if (session) return null;

  return <SignupForm />;
}
