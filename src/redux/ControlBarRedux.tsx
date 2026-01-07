import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setSearchQuery,
  setStatusFilter,
  setSortBy,
} from '../store/slices/filtersSlice';
import { selectFilters } from '../store/selectors';
import type { SortBy, TimerStatus } from '../types/timer';
import { Search, Plus } from 'lucide-react';

interface ControlBarReduxProps {
  onCreateTimer: () => void;
  timersCount: number;
}

export const ControlBarRedux: React.FC<ControlBarReduxProps> = ({
  onCreateTimer,
  timersCount,
}) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <input
              type="text"
              placeholder="Search timers..."
              value={filters.searchQuery}
              onChange={(event) => dispatch(setSearchQuery(event.target.value))}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-blue-50/50 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={filters.status}
            onChange={(event) =>
              dispatch(setStatusFilter(event.target.value as TimerStatus))
            }
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-blue-50 transition-colors duration-200 cursor-pointer font-medium text-gray-700 text-sm sm:text-base"
          >
            <option value="all">🎯 All Status</option>
            <option value="running">▶️ Running</option>
            <option value="paused">⏸️ Paused</option>
            <option value="idle">⏹️ Idle</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={filters.sortBy}
            onChange={(event) =>
              dispatch(setSortBy(event.target.value as SortBy))
            }
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-blue-50 transition-colors duration-200 cursor-pointer font-medium text-gray-700 text-sm sm:text-base"
          >
            <option value="createdAt">📅 Sort by Created</option>
            <option value="elapsed">⏱️ Sort by Time</option>
            <option value="name">🔤 Sort by Name</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onCreateTimer}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap font-semibold text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          New Timer
        </button>
      </div>

      <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-blue-700 font-medium bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg inline-block">
        📊 Showing {timersCount} {timersCount === 1 ? 'timer' : 'timers'}
      </div>
    </div>
  );
};
