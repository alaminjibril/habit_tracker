import { useState, useEffect } from 'react';
import { Habit } from '@/types/habit';
import { 
  getUserHabits, 
  saveAllHabits, 
  getAllHabits, 
  toggleHabitCompletion as toggleLogic 
} from '@/lib/habits';
import { useAuth } from './useAuth';

export function useHabits() {
  const { session } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setHabits(getUserHabits(session.userId));
      setLoading(false);
    }
  }, [session]);

  const addHabit = (name: string, description: string) => {
    if (!session) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      userId: session.userId,
      name,
      description,
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };

    const allHabits = [...getAllHabits(), newHabit];
    saveAllHabits(allHabits);
    setHabits(getUserHabits(session.userId));
  };

  const updateHabit = (id: string, name: string, description: string) => {
    if (!session) return;

    const allHabits = getAllHabits().map((h) => {
      if (h.id === id && h.userId === session.userId) {
        return { ...h, name, description };
      }
      return h;
    });

    saveAllHabits(allHabits);
    setHabits(getUserHabits(session.userId));
  };

  const deleteHabit = (id: string) => {
    if (!session) return;

    const allHabits = getAllHabits().filter(
      (h) => !(h.id === id && h.userId === session.userId)
    );

    saveAllHabits(allHabits);
    setHabits(getUserHabits(session.userId));
  };

  const toggleCompletion = (id: string, date: string) => {
    if (!session) return;

    const allHabits = getAllHabits().map((h) => {
      if (h.id === id && h.userId === session.userId) {
        return toggleLogic(h, date);
      }
      return h;
    });

    saveAllHabits(allHabits);
    setHabits(getUserHabits(session.userId));
  };

  return {
    habits,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
  };
}
