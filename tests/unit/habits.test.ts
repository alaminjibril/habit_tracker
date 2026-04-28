import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '@/lib/habits';
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
