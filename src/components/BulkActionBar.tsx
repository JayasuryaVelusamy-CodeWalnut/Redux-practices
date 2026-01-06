import React from 'react';
import { Play, Pause, RotateCcw, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui';

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
    <div
      className={`border-2 rounded-xl p-5 mb-6 shadow-soft animate-slide-up ${themeBgColors[colorTheme]}`}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
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
          {!isAllSelected && totalCount > 0 && (
            <Button onClick={onSelectAll} variant="ghost" className="px-1">
              Select all
            </Button>
          )}
          {selectedCount > 0 && (
            <Button onClick={onDeselectAll} variant="ghost" className="px-1">
              Deselect all
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onBulkStart}
            variant="primary"
            leadingIcon={<Play className="w-4 h-4" />}
            className="text-sm"
          >
            Start All
          </Button>
          <Button
            onClick={onBulkPause}
            variant="primary"
            leadingIcon={<Pause className="w-4 h-4" />}
            className="text-sm"
          >
            Pause All
          </Button>
          <Button
            onClick={onBulkReset}
            variant="secondary"
            leadingIcon={<RotateCcw className="w-4 h-4" />}
            className="text-sm"
          >
            Reset
          </Button>
          <Button
            onClick={onBulkDelete}
            variant="danger"
            leadingIcon={<Trash2 className="w-4 h-4" />}
            className="text-sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
