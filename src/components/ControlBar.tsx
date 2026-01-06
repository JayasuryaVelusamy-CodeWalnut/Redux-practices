import React from 'react';
import type { FilterState, SortBy, TimerStatus } from '../types/timer';
import { Search, Plus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui';

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

  const themeInputColors = {
    blue: 'focus:ring-blue-500',
    green: 'focus:ring-green-500',
    red: 'focus:ring-red-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-soft">
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
        <Button
          onClick={onCreateTimer}
          variant="primary"
          leadingIcon={<Plus className="w-5 h-5" />}
          className="whitespace-nowrap"
        >
          New Timer
        </Button>
      </div>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
        Showing {timersCount} timer{timersCount !== 1 ? 's' : ''}
      </p>
    </div>
  );
};
