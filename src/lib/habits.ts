import { Habit } from "@/types/habit";
import { getItem, setItem } from "./storage";
import { STORAGE_KEYS } from "./constants";

/**
 * Toggles a completion date for a habit.
 * 1. If date not in completions, add it
 * 2. If date exists, remove it
 * 3. No duplicates in returned habit
 * 4. Do not mutate original
 * 5. Return new habit object
 */
export function toggleHabitCompletion(habit: Habit, date: string): Habit {
  const isCompleted = habit.completions.includes(date);
  
  const newCompletions = isCompleted
    ? habit.completions.filter((d) => d !== date)
    : [...habit.completions, date];

  // Ensure no duplicates and keep it clean
  const uniqueCompletions = Array.from(new Set(newCompletions));

  return {
    ...habit,
    completions: uniqueCompletions,
  };
}

/**
 * Helper to get all habits from storage
 */
export function getAllHabits(): Habit[] {
  return getItem<Habit[]>(STORAGE_KEYS.HABITS) || [];
}

/**
 * Helper to save habits to storage
 */
export function saveAllHabits(habits: Habit[]): void {
  setItem(STORAGE_KEYS.HABITS, habits);
}

/**
 * Helper to get habits for a specific user
 */
export function getUserHabits(userId: string): Habit[] {
  const allHabits = getAllHabits();
  return allHabits.filter((h) => h.userId === userId);
}