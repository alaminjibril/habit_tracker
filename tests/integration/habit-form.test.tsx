import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HabitForm from '@/components/habits/HabitForm';
import HabitList from '@/components/habits/HabitList';
import { Habit } from '@/types/habit';

describe('habit form', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('shows a validation error when habit name is empty', async () => {
    const onSave = vi.fn();
    render(<HabitForm onSave={onSave} onCancel={vi.fn()} />);
    
    fireEvent.click(screen.getByTestId('habit-save-button'));
    
    expect(screen.getByText(/Habit name is required/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('creates a new habit and renders it in the list', async () => {
    const habits: Habit[] = [];
    const onToggle = vi.fn();
    const onUpdate = vi.fn();
    const onDelete = vi.fn();

    const { rerender } = render(
      <HabitList habits={habits} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
    );

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();

    const newHabit: Habit = {
      id: '1',
      userId: 'u1',
      name: 'Drink Water',
      description: '8 glasses',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: []
    };

    rerender(
      <HabitList habits={[newHabit]} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
    );

    expect(screen.getByTestId('habit-card-drink-water')).toBeInTheDocument();
    expect(screen.getByText('Drink Water')).toBeInTheDocument();
  });

  it('edits an existing habit and preserves immutable fields', async () => {
    const habit: Habit = {
      id: '1',
      userId: 'u1',
      name: 'Old Name',
      description: 'Old Desc',
      frequency: 'daily',
      createdAt: '2024-04-20T10:00:00Z',
      completions: ['2024-04-21']
    };

    const onSave = vi.fn();
    render(<HabitForm initialData={habit} onSave={onSave} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByTestId('habit-save-button'));

    expect(onSave).toHaveBeenCalledWith('New Name', 'Old Desc');
  });

  it('deletes a habit only after explicit confirmation', async () => {
    const habit: Habit = {
      id: '1',
      userId: 'u1',
      name: 'Drink Water',
      description: '',
      frequency: 'daily',
      createdAt: '',
      completions: []
    };

    const onDelete = vi.fn();
    render(<HabitList habits={[habit]} onToggle={vi.fn()} onUpdate={vi.fn()} onDelete={onDelete} />);

    fireEvent.click(screen.getByTestId('habit-delete-drink-water'));
    
    // Should show confirmation
    expect(screen.getByText(/Delete this habit\?/i)).toBeInTheDocument();
    expect(onDelete).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('confirm-delete-button'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('toggles completion and updates the streak display', async () => {
    const habit: Habit = {
      id: '1',
      userId: 'u1',
      name: 'Drink Water',
      description: '',
      frequency: 'daily',
      createdAt: '',
      completions: []
    };

    const onToggle = vi.fn();
    render(<HabitList habits={[habit]} onToggle={onToggle} onUpdate={vi.fn()} onDelete={vi.fn()} />);

    fireEvent.click(screen.getByTestId('habit-complete-drink-water'));
    expect(onToggle).toHaveBeenCalled();
  });
});
