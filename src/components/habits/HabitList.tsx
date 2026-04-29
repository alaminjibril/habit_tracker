'use client';

import React, { useState } from 'react';
import { Habit } from '@/types/habit';
import HabitCard from './HabitCard';
import HabitForm from './HabitForm';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string, date: string) => void;
  onUpdate: (id: string, name: string, description: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitList({ habits, onToggle, onUpdate, onDelete }: HabitListProps) {
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  if (habits.length === 0) {
    return (
      <div
        data-testid="empty-state"
        className="flex flex-col items-center justify-center py-24 px-8 text-center bg-white dark:bg-[#1A1A1A] rounded-[40px] border border-zinc-100 dark:border-zinc-800/50 shadow-sm"
      >
        <div className="w-24 h-24 bg-[#F5FAFA] dark:bg-zinc-800/50 text-[#2DBFAD] rounded-[30px] flex items-center justify-center mb-8">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">No habits yet</h3>
        <p className="text-[#8A9BB0] max-w-xs leading-relaxed font-medium">
          Start your journey today by adding your first habit. We'll help you track your progress.
        </p>
      </div>
    );
  }

  return (
    <div data-testid="habit-list" className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={(date) => onToggle(habit.id, date)}
          onEdit={() => setEditingHabit(habit)}
          onDelete={() => onDelete(habit.id)}
        />
      ))}

      {editingHabit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            <HabitForm
              initialData={editingHabit}
              onSave={(name, description) => {
                onUpdate(editingHabit.id, name, description);
                setEditingHabit(null);
              }}
              onCancel={() => setEditingHabit(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
