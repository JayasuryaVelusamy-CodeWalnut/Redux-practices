import React from 'react';
import type { Timer, FilterState } from '../types/timer';
import { TimerCard } from './TimerCard';
import { calculateElapsed } from '../utils/timerUtils';

interface TimerListProps {
  timers: Timer[];
  selectedIds: Set<string>;
  filters: FilterState;
  onToggleSelect: (id: string) => void;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}

export const TimerList: React.FC<TimerListProps> = ({
  timers,
  selectedIds,
  filters,
  onToggleSelect,
  onStart,
  onPause,
  onReset,
  onDelete,
  onEdit,
}) => {
  // Filter timers
  const filteredTimers = timers.filter((timer) => {
    // Status filter
    if (filters.status !== 'all' && timer.status !== filters.status) {
      return false;
    }

    // Search filter
    if (
      filters.searchQuery &&
      !timer.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Sort timers
  const sortedTimers = [...filteredTimers].sort((a, b) => {
    switch (filters.sortBy) {
      case 'createdAt':
        return b.createdAt - a.createdAt;
      case 'elapsed':
        return calculateElapsed(b) - calculateElapsed(a);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (sortedTimers.length === 0) {
    return (
      <div
        className="text-center py-16 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-soft"
        role="status"
        aria-live="polite"
      >
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No timers found
        </p>
        <p className="text-base mt-2">
          {filters.searchQuery || filters.status !== 'all'
            ? 'Try adjusting your filters'
            : 'Create a new timer to get started'}
        </p>
      </div>
    );
  }

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-label="List of timers"
      role="list"
    >
      {sortedTimers.map((timer) => (
        <TimerCard
          key={timer.id}
          timer={timer}
          isSelected={selectedIds.has(timer.id)}
          onToggleSelect={onToggleSelect}
          onStart={onStart}
          onPause={onPause}
          onReset={onReset}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
};
