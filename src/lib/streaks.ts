/* MENTOR_TRACE_STAGE3_HABIT_A91 */

/**
 * Calculates the current streak of habit completions.
 * 1. Remove duplicates
 * 2. Sort by date
 * 3. If today not completed, return 0
 * 4. Count consecutive days backward from today
 */
export function calculateCurrentStreak(
  completions: string[],
  today?: string
): number {
  if (!completions || completions.length === 0) return 0;

  const todayStr = today || new Date().toISOString().split('T')[0];
  
  // 1. Remove duplicates and filter out future dates (if any)
  const uniqueCompletions = Array.from(new Set(completions));
  
  // 2. Sort by date descending
  uniqueCompletions.sort((a, b) => b.localeCompare(a));

  // 3. If today not completed, return 0 (as per requirements)
  if (!uniqueCompletions.includes(todayStr)) {
    return 0;
  }

  // 4. Count consecutive days backward
  let streak = 0;
  let currentDate = new Date(todayStr);

  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (uniqueCompletions.includes(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
