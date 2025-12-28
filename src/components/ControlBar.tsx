import React from 'react';
import type { FilterState, SortBy, TimerStatus } from '../types/timer';
import { Search, Plus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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
  const { colorTheme } = useTheme();

  const themeColors = {
    blue: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700',
    green:
      'bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700',
    red: 'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700',
  };

  const themeInputColors = {
    blue: 'focus:ring-blue-500',
    green: 'focus:ring-green-500',
    red: 'focus:ring-red-500',
  };

  return (
    <section
      className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-soft"
      aria-label="Timer controls and filters"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <label htmlFor="timer-search" className="sr-only">
            Search timers
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="timer-search"
              type="search"
              placeholder="Search timers..."
              value={filters.searchQuery}
              onChange={(e) =>
                onFilterChange({ ...filters, searchQuery: e.target.value })
              }
              className={`w-full pl-11 pr-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${themeInputColors[colorTheme]}`}
              aria-label="Search timers by name"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status-filter" className="sr-only">
            Filter by status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                status: e.target.value as TimerStatus,
              })
            }
            className={`px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer transition-colors font-medium ${themeInputColors[colorTheme]}`}
            aria-label="Filter timers by status"
          >
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="paused">Paused</option>
            <option value="idle">Idle</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sort-by" className="sr-only">
            Sort timers
          </label>
          <select
            id="sort-by"
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({ ...filters, sortBy: e.target.value as SortBy })
            }
            className={`px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer transition-colors font-medium ${themeInputColors[colorTheme]}`}
            aria-label="Sort timers"
          >
            <option value="createdAt">Sort by Created</option>
            <option value="elapsed">Sort by Elapsed</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Create Button */}
        <button
          onClick={onCreateTimer}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 text-white rounded-lg whitespace-nowrap font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm ${themeColors[colorTheme]}`}
          aria-label="Create new timer"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
          <span>New Timer</span>
        </button>
      </div>

      <div
        className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Showing {timersCount} timer{timersCount !== 1 ? 's' : ''}
      </div>
    </section>
  );
};
