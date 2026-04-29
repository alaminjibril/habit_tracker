import { useState, useEffect, useCallback } from 'react';
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

  const logout = useCallback(() => {
    authLogout();
    setSession(null);
    router.push('/login');
  }, [router]);

  return {
    session,
    loading,
    logout,
  };
}
