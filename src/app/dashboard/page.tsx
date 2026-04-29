'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useHabits } from '@/hooks/useHabits';
import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/shared/SplashScreen';

export default function DashboardPage() {
  const { session, loading: authLoading, logout } = useAuth();
  const { habits, addHabit, updateHabit, deleteHabit, toggleCompletion } = useHabits();
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !authLoading && !session) {
      router.push('/login');
    }
  }, [mounted, authLoading, session, router]);

  const weekDays = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    // Get Monday of current week
    const day = now.getDay() || 7;
    startOfWeek.setDate(now.getDate() - day + 1);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return {
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        fullDate: d.toISOString().split('T')[0],
        isToday: d.toDateString() === now.toDateString()
      };
    });
  }, []);

  if (authLoading) {
    return <SplashScreen />;
  }

  if (!session) {
    return null;
  }

  const username = session.email.split('@')[0];

  return (
    <div data-testid="dashboard-page" className="min-h-screen bg-[#F5FAFA] dark:bg-[#111111] transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen">

        {/* Sidebar Summary (Desktop Only) */}
        <aside className="hidden lg:flex lg:w-80 flex-col bg-white dark:bg-[#1A1A1A] border-r border-zinc-100 dark:border-zinc-800 p-10 h-screen sticky top-0">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-[#2DBFAD] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2DBFAD]/20">
              <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="8" height="40" rx="4" fill="white" />
                <rect x="42" y="10" width="8" height="40" rx="4" fill="white" />
                <path d="M18 30L28 40L45 20" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Habit Tracker</h1>
          </div>

          <div className="mb-10">
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-2">My Progress</p>
            <div className="space-y-4">
              <div className="bg-[#F5FAFA] dark:bg-zinc-800/50 p-5 rounded-2xl">
                <p className="text-3xl font-black text-[#2DBFAD]">{habits.length}</p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Active Habits</p>
              </div>
              <div className="bg-[#F5FAFA] dark:bg-zinc-800/50 p-5 rounded-2xl">
                <p className="text-3xl font-black text-zinc-900 dark:text-white">
                  {habits.filter(h => h.completions.includes(new Date().toISOString().split('T')[0])).length}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Done Today</p>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={logout}
              data-testid="auth-logout-button"
              className="w-full py-4 px-6 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-colors text-left flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Header (Visible only on Mobile) */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-[#1A1A1A] border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2DBFAD] rounded-lg flex items-center justify-center shadow-md shadow-[#2DBFAD]/20">
              <svg width="18" height="18" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="8" height="40" rx="4" fill="white" />
                <rect x="42" y="10" width="8" height="40" rx="4" fill="white" />
                <path d="M18 30L28 40L45 20" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-zinc-900 dark:text-white">Habit Tracker</span>
          </div>
          <button
            onClick={logout}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
            title="Logout"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-6 py-8 lg:px-12 lg:pt-12 pb-32">
          {/* Header & Greeting */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                Hello,<span className="text-[#2DBFAD] capitalize ml-1">{username}</span>
              </h2>
              <p className="text-[#8A9BB0] text-sm font-medium mt-1">Let's keep up the good work! 👏</p>
            </div>
          </div>

          {/* Week Strip Calendar */}
          <div className="flex justify-between items-center mb-10 overflow-x-auto gap-2 pb-2">
            {weekDays.map((d) => (
              <div
                key={d.fullDate}
                className="flex flex-col items-center min-w-[45px]"
              >
                <span className="text-[11px] font-bold text-[#8A9BB0] uppercase mb-3">
                  {d.name}
                </span>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-black transition-all ${d.isToday ? 'bg-[#2DBFAD] text-white shadow-lg shadow-[#2DBFAD]/30' : 'bg-white dark:bg-[#1A1A1A] text-zinc-900 dark:text-zinc-100'
                  }`}>
                  {d.date}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Banner */}
          {habits.length > 0 && (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#2DBFAD] to-[#28ab9a] p-6 rounded-[32px] mb-10 shadow-xl shadow-[#2DBFAD]/20">
              <div className="relative z-10 flex items-center gap-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="10" fill="transparent" strokeOpacity="0.2" />
                    <circle
                      cx="50" cy="50" r="45" stroke="white" strokeWidth="10" fill="transparent"
                      strokeDasharray="282.7"
                      strokeDashoffset={282.7 - (282.7 * (habits.filter(h => h.completions.includes(new Date().toISOString().split('T')[0])).length / habits.length))}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-black text-sm">
                    {Math.round((habits.filter(h => h.completions.includes(new Date().toISOString().split('T')[0])).length / habits.length) * 100)}%
                  </div>
                </div>
                <div className="text-white">
                  <p className="text-sm font-medium opacity-90 mb-1">You're doing well,</p>
                  <h3 className="text-xl font-black">keep it up!</h3>
                </div>
              </div>
              {/* Decorative target illustration (SVG) */}
              <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                <svg width="150" height="150" viewBox="0 0 100 100" fill="white">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                </svg>
              </div>
            </div>
          )}

          {/* Visual Frequency Toggles */}
          <div className="flex p-1.5 bg-white dark:bg-[#1A1A1A] rounded-2xl mb-8 border border-zinc-100 dark:border-zinc-800 shadow-sm max-w-[160px]">
            <div className="flex-1 py-2.5 px-4 bg-[#2DBFAD] text-white rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Once a day
            </div>
          </div>

          {/* Habit Section Header (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Daily Habits</h3>
          </div>

          {/* Habit List */}
          <HabitList
            habits={habits}
            onToggle={toggleCompletion}
            onUpdate={updateHabit}
            onDelete={deleteHabit}
          />
        </main>

        <button
          onClick={() => setIsAdding(true)}
          data-testid="create-habit-button"
          className="fixed bottom-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#2DBFAD] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#2DBFAD]/40 hover:scale-110 active:scale-95 transition-all z-40 lg:bottom-12 lg:right-12 lg:left-auto lg:translate-x-0"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Habit Form Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            <HabitForm
              onSave={(name, description) => {
                addHabit(name, description);
                setIsAdding(false);
              }}
              onCancel={() => setIsAdding(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
