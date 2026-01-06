import React from 'react';
import type { FilterState, SortBy, TimerStatus } from '../../../types/timer';
import { Search, Plus } from 'lucide-react';

interface ControlBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onCreateTimer: () => void;
  timersCount: number;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  filters,
  onFilterChange,
  onCreateTimer,
  timersCount,
}) => {
  const timerText = timersCount === 1 ? 'timer' : 'timers';

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search timers..."
              value={filters.searchQuery}
              onChange={(event) =>
                onFilterChange({ ...filters, searchQuery: event.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <select
            value={filters.status}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                status: event.target.value as TimerStatus,
              })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="paused">Paused</option>
            <option value="idle">Idle</option>
          </select>
        </div>

        <div>
          <select
            value={filters.sortBy}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                sortBy: event.target.value as SortBy,
              })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt">Sort by Created</option>
            <option value="elapsed">Sort by Elapsed</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <button
          onClick={onCreateTimer}
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          New Timer
        </button>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        Showing {timersCount} {timerText}
      </div>
    </div>
  );
};
