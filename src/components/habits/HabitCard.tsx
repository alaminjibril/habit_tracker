'use client';

import React, { useState } from 'react';
import { Habit } from '@/types/habit';
import { calculateCurrentStreak } from '@/lib/streaks';
import { getHabitSlug } from '@/lib/slug';

interface HabitCardProps {
  habit: Habit;
  onToggle: (date: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function HabitCard({ habit, onToggle, onEdit, onDelete }: HabitCardProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completions.includes(today);
  const streak = calculateCurrentStreak(habit.completions);
  const slug = getHabitSlug(habit.name);

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className={`group relative bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all duration-300 ${isCompletedToday ? 'shadow-none bg-zinc-50/50 dark:bg-zinc-800/20' : 'hover:shadow-md'
        }`}
    >
      <div className="flex items-center gap-4">
        {/* Icon Circle */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${isCompletedToday
          ? 'bg-[#2DBFAD]/10 text-[#2DBFAD]'
          : 'bg-[#F5FAFA] dark:bg-zinc-800 text-[#2DBFAD]'
          }`}>
          {habit.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <h3 className={`text-base font-bold truncate transition-colors ${isCompletedToday ? 'text-[#8A9BB0] line-through' : 'text-zinc-900 dark:text-white'
            }`}>
            {habit.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span data-testid={`habit-streak-${slug}`} className="text-xs font-black text-[#2DBFAD] uppercase tracking-wider">
              🔥 {streak} {streak === 1 ? 'day' : 'days'}
            </span>
            {habit.description && (
              <>
                <span className="text-zinc-300">•</span>
                <span className="text-xs text-[#8A9BB0] truncate font-medium">
                  {habit.description}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Completion Checkbox */}
        <button
          data-testid={`habit-complete-${slug}`}
          onClick={() => onToggle(today)}
          className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${isCompletedToday
            ? 'bg-[#2DBFAD] border-[#2DBFAD] text-white'
            : 'border-zinc-200 dark:border-zinc-700 text-transparent hover:border-[#2DBFAD]'
            }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>

      {/* Hidden Actions (Visible on Hover/Desktop or via a long press/gesture if implemented) */}
      <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-zinc-50 dark:border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          data-testid={`habit-edit-${slug}`}
          onClick={onEdit}
          className="p-1.5 text-zinc-400 hover:text-[#2DBFAD] rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          data-testid={`habit-delete-${slug}`}
          onClick={() => setShowConfirmDelete(true)}
          className="p-1.5 text-zinc-400 hover:text-[#FF6B6B] rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-[#1A1A1A] p-8 rounded-[40px] shadow-2xl">
            <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Delete Habit?</h4>
            <p className="text-[#8A9BB0] text-sm mb-8">Are you sure you want to delete this habit?</p>
            <div className="flex gap-4">
              <button onClick={() => setShowConfirmDelete(false)} className="flex-1 py-3 text-zinc-500 font-bold hover:bg-zinc-50 rounded-xl">Cancel</button>
              <button data-testid="confirm-delete-button" onClick={() => { onDelete(); setShowConfirmDelete(false); }} className="flex-1 py-3 bg-[#FF6B6B] text-white font-bold rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
