import { describe, it, expect, beforeEach } from 'vitest';
import { toggleHabitCompletion, getAllHabits, saveAllHabits, getUserHabits } from '@/lib/habits';
import { Habit } from '@/types/habit';

describe('toggleHabitCompletion', () => {
  const mockHabit: Habit = {
    id: '1',
    userId: 'user-1',
    name: 'Test Habit',
    description: '',
    frequency: 'daily',
    createdAt: '2024-04-23T10:00:00Z',
    completions: [],
  };

  it('adds a completion date when the date is not present', () => {
    const result = toggleHabitCompletion(mockHabit, '2024-04-23');
    expect(result.completions).toContain('2024-04-23');
  });

  it('removes a completion date when the date already exists', () => {
    const habitWithCompletion = { ...mockHabit, completions: ['2024-04-23'] };
    const result = toggleHabitCompletion(habitWithCompletion, '2024-04-23');
    expect(result.completions).not.toContain('2024-04-23');
  });

  it('does not mutate the original habit object', () => {
    const habit = { ...mockHabit, completions: [] };
    toggleHabitCompletion(habit, '2024-04-23');
    expect(habit.completions).toEqual([]);
  });

  it('does not return duplicate completion dates', () => {
    const habit = { ...mockHabit, completions: ['2024-04-23'] };
    const result = toggleHabitCompletion(habit, '2024-04-23'); // Removes it
    const result2 = toggleHabitCompletion(result, '2024-04-23'); // Adds it back
    expect(result2.completions.filter(d => d === '2024-04-23').length).toBe(1);
  });
});



describe('habit storage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('gets all habits (empty)', () => {
    expect(getAllHabits()).toEqual([]);
  });

  it('saves and gets all habits', () => {
    const habits: Habit[] = [{ id: '1', userId: 'u1', name: 'H1', description: '', frequency: 'daily', createdAt: '', completions: [] }];
    saveAllHabits(habits);
    expect(getAllHabits()).toEqual(habits);
  });

  it('gets habits for a specific user', () => {
    const habits: Habit[] = [
      { id: '1', userId: 'u1', name: 'H1', description: '', frequency: 'daily', createdAt: '', completions: [] },
      { id: '2', userId: 'u2', name: 'H2', description: '', frequency: 'daily', createdAt: '', completions: [] }
    ];
    saveAllHabits(habits);
    const userHabits = getUserHabits('u1');
    expect(userHabits.length).toBe(1);
    expect(userHabits[0].id).toBe('1');
  });
});
