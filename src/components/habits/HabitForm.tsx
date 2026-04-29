'use client';

import React, { useState } from 'react';

interface HabitFormProps {
  onSave: (name: string, description: string) => void;
  onCancel: () => void;
  initialData?: {
    name: string;
    description: string;
  };
}

export default function HabitForm({ onSave, onCancel, initialData }: HabitFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Habit name is required');
      return;
    }
    onSave(name, description);
  };

  return (
    <div data-testid="habit-form" className="p-8 lg:p-10">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
          {initialData ? 'Edit Habit' : 'Add New Habit'}
        </h2>
        <button 
          onClick={onCancel}
          className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
            Habit Name
          </label>
          <input
            type="text"
            data-testid="habit-name-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. Drink water"
            className="w-full px-6 py-4 bg-[#F5FAFA] dark:bg-zinc-800/50 border border-transparent focus:border-[#2DBFAD] focus:bg-white dark:focus:bg-zinc-800 rounded-2xl outline-none transition-all font-medium dark:text-white"
          />
          {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}
        </div>

        <div>
          <label className="block text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
            Description (Optional)
          </label>
          <textarea
            data-testid="habit-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Why is this important?"
            rows={3}
            className="w-full px-6 py-4 bg-[#F5FAFA] dark:bg-zinc-800/50 border border-transparent focus:border-[#2DBFAD] focus:bg-white dark:focus:bg-zinc-800 rounded-2xl outline-none transition-all font-medium dark:text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
            Frequency
          </label>
          <div className="relative">
            <select
              data-testid="habit-frequency-select"
              defaultValue="daily"
              disabled
              className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800 text-zinc-400 rounded-2xl outline-none appearance-none font-medium cursor-not-allowed"
            >
              <option value="daily">Daily</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 mt-2 ml-1">Currently supporting daily tracking only</p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 text-zinc-500 dark:text-zinc-400 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-2xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            data-testid="habit-save-button"
            className="flex-1 py-4 bg-[#2DBFAD] text-white font-bold rounded-2xl shadow-xl shadow-[#2DBFAD]/30 hover:bg-[#28ab9a] transition-all active:scale-[0.98]"
          >
            {initialData ? 'Save Changes' : 'Add Habit'}
          </button>
        </div>
      </form>
    </div>
  );
}
