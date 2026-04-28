'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/auth';
import SplashScreen from '@/components/shared/SplashScreen';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Simulate splash screen duration (minimum 1.2s for smooth feel)
    const timer = setTimeout(() => {
      const session = getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  if (!mounted) return null;

  return <SplashScreen />;
}
