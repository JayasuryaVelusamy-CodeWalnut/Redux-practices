import React from 'react';
import { Play, Pause, RotateCcw, Trash2 } from 'lucide-react';

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
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={isAllSelected ? onDeselectAll : onSelectAll}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="font-semibold">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
          {!isAllSelected && totalCount > 0 && (
            <button
              onClick={onSelectAll}
              className="text-sm text-blue-600 hover:underline"
            >
              Select all
            </button>
          )}
          {selectedCount > 0 && (
            <button
              onClick={onDeselectAll}
              className="text-sm text-blue-600 hover:underline"
            >
              Deselect all
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBulkStart}
            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            <Play className="w-4 h-4" />
            Start All
          </button>
          <button
            onClick={onBulkPause}
            className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
          >
            <Pause className="w-4 h-4" />
            Pause All
          </button>
          <button
            onClick={onBulkReset}
            className="flex items-center gap-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={onBulkDelete}
            className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
