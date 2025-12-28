import React from 'react';
import { Play, Pause, RotateCcw, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBulkStart: () => void;
  onBulkPause: () => void;
  onBulkReset: () => void;
  onBulkDelete: () => void;
}

export const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  totalCount,
  isAllSelected,
  onSelectAll,
  onDeselectAll,
  onBulkStart,
  onBulkPause,
  onBulkReset,
  onBulkDelete,
}) => {
  const { colorTheme } = useTheme();

  const themeBgColors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800',
    green:
      'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800',
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <section
      className={`border-2 rounded-xl p-5 mb-6 shadow-soft animate-slide-up ${themeBgColors[colorTheme]}`}
      role="region"
      aria-label="Bulk actions toolbar"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={isAllSelected ? onDeselectAll : onSelectAll}
              className={`w-5 h-5 cursor-pointer rounded border-gray-300 focus:ring-2 focus:ring-offset-2 transition-colors ${
                colorTheme === 'blue'
                  ? 'text-blue-600 focus:ring-blue-500'
                  : colorTheme === 'green'
                    ? 'text-green-600 focus:ring-green-500'
                    : 'text-red-600 focus:ring-red-500'
              }`}
              aria-label={
                isAllSelected ? 'Deselect all timers' : 'Select all timers'
              }
            />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
          {!isAllSelected && totalCount > 0 && (
            <button
              onClick={onSelectAll}
              className={`text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 rounded px-1 transition-colors ${
                colorTheme === 'blue'
                  ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:ring-blue-500'
                  : colorTheme === 'green'
                    ? 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 focus:ring-green-500'
                    : 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:ring-red-500'
              }`}
              aria-label="Select all timers"
            >
              Select all
            </button>
          )}
          {selectedCount > 0 && (
            <button
              onClick={onDeselectAll}
              className={`text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 rounded px-1 transition-colors ${
                colorTheme === 'blue'
                  ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:ring-blue-500'
                  : colorTheme === 'green'
                    ? 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 focus:ring-green-500'
                    : 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:ring-red-500'
              }`}
              aria-label="Deselect all timers"
            >
              Deselect all
            </button>
          )}
        </div>

        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Bulk actions"
        >
          <button
            onClick={onBulkStart}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm ${
              colorTheme === 'blue'
                ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700'
                : colorTheme === 'green'
                  ? 'bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700'
                  : 'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700'
            }`}
            aria-label="Start all selected timers"
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            <span>Start All</span>
          </button>
          <button
            onClick={onBulkPause}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm ${
              colorTheme === 'blue'
                ? 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600'
                : colorTheme === 'green'
                  ? 'bg-green-400 hover:bg-green-500 active:bg-green-600 focus:ring-green-400 dark:bg-green-500 dark:hover:bg-green-600'
                  : 'bg-red-400 hover:bg-red-500 active:bg-red-600 focus:ring-red-400 dark:bg-red-500 dark:hover:bg-red-600'
            }`}
            aria-label="Pause all selected timers"
          >
            <Pause className="w-4 h-4" aria-hidden="true" />
            <span>Pause All</span>
          </button>
          <button
            onClick={onBulkReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-700 dark:active:bg-gray-800 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 shadow-sm"
            aria-label="Reset all selected timers"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset</span>
          </button>
          <button
            onClick={onBulkDelete}
            className="flex items-center gap-2 px-4 py-2 bg-danger-500 dark:bg-danger-600 text-white rounded-lg hover:bg-danger-600 dark:hover:bg-danger-700 active:bg-danger-700 dark:active:bg-danger-800 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-danger-500 dark:focus:ring-danger-400 focus:ring-offset-2 shadow-sm"
            aria-label="Delete all selected timers"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </section>
  );
};
