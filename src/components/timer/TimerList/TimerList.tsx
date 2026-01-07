import React from 'react';
import type { Timer, FilterState } from '../../../types/timer';
import { TimerCard } from '../../common/Card/Card';
import { calculateElapsed } from '../../../utils/timerUtils';

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
  const filteredTimers = timers.filter((timer) => {
    if (filters.status !== 'all' && timer.status !== filters.status) {
      return false;
    }

    if (
      filters.searchQuery &&
      !timer.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

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
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No timers found</p>
        <p className="text-sm mt-2">
          {filters.searchQuery || filters.status !== 'all'
            ? 'Try adjusting your filters'
            : 'Create a new timer to get started'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
};
