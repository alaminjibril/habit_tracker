import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@/types/auth';
import { getSession, logout as authLogout } from '@/lib/auth';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const activeSession = getSession();
    setSession(activeSession);
    setLoading(false);
  }, []);

  const logout = () => {
    authLogout();
    setSession(null);
    router.push('/login');
  };

  const requireAuth = () => {
    if (!loading && !session) {
      router.push('/login');
    }
  };

  const requireNoAuth = () => {
    if (!loading && session) {
      router.push('/dashboard');
    }
  };

  return {
    session,
    loading,
    logout,
    requireAuth,
    requireNoAuth,
  };
}
