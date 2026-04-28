'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-zinc-50 dark:bg-[#1a1a1a]">
      {/* Left Panel (Desktop) / Top Banner (Mobile) */}
      <div className="lg:w-1/2 bg-[#2DBFAD] flex flex-col justify-center px-8 pt-20 pb-24 lg:pb-20 lg:px-16 text-white relative">
        <div className="max-w-md relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Welcome Back !</h1>
          <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-[280px]">
            Login to continue building your daily habits .
          </p>
        </div>
      </div>

      {/* Right Panel (Desktop) / Form Area (Mobile) */}
      <div className="lg:w-1/2 flex items-center justify-center p-0 lg:p-12 -mt-12 lg:mt-0 relative z-20">
        <div className="w-full h-full lg:h-auto max-w-md bg-white dark:bg-[#232323] rounded-t-[50px] lg:rounded-[30px] px-8 py-10 lg:p-12 shadow-2xl lg:shadow-none border-t lg:border border-zinc-100 dark:border-zinc-800">
          <h2 className="text-2xl font-bold text-[#2DBFAD] mb-8">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2 ml-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  data-testid="auth-login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-[#2a2a2a] border border-zinc-100 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-[#2DBFAD] outline-none transition-all text-sm dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  data-testid="auth-login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-zinc-50 dark:bg-[#2a2a2a] border border-zinc-100 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-[#2DBFAD] outline-none transition-all text-sm dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-sm font-bold text-[#2DBFAD] hover:underline">
                Forgot Password?
              </Link>
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 text-center animate-shake">
                {error}
              </p>
            )}

            <button
              type="submit"
              data-testid="auth-login-submit"
              disabled={loading}
              className="w-full py-4 bg-[#2DBFAD] hover:bg-[#28ab9a] text-white font-bold rounded-2xl shadow-lg shadow-[#2DBFAD]/20 transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#2DBFAD] font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
