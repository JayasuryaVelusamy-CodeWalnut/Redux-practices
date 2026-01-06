import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAll, deselectAll } from '../store/slices/selectionSlice';
import {
  startAllTimers,
  pauseAllTimers,
  resetAllTimers,
} from '../store/slices/timersSlice';
import { openConfirmModal } from '../store/slices/uiSlice';
import {
  selectTimers,
  selectSelectedIds,
  selectIsAllSelected,
} from '../store/selectors';
import { Play, Pause, RotateCcw, Trash2 } from 'lucide-react';

export const BulkActionBarRedux: React.FC = () => {
  const dispatch = useAppDispatch();
  const timers = useAppSelector(selectTimers);
  const selectedIds = useAppSelector(selectSelectedIds);
  const isAllSelected = useAppSelector(selectIsAllSelected);

  const selectedCount = selectedIds.length;
  const totalCount = timers.length;

  if (selectedCount === 0) {
    return null;
  }

  const handleSelectAll = () => {
    dispatch(selectAll(timers.map((timer) => timer.id)));
  };

  const handleDeselectAll = () => {
    dispatch(deselectAll());
  };

  const handleBulkDelete = () => {
    dispatch(
      openConfirmModal({
        title: 'Delete Multiple Timers',
        message: `Are you sure you want to delete ${selectedCount} timer(s)?`,
        onConfirmAction: 'timers/deleteTimers',
        actionPayload: selectedIds,
      })
    );
  };

  return (
    <section
      className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6"
      aria-label="Bulk actions"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={isAllSelected ? handleDeselectAll : handleSelectAll}
              className="w-4 h-4 cursor-pointer"
              aria-label={
                isAllSelected ? 'Deselect all timers' : 'Select all timers'
              }
            />
            <span className="font-semibold">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
          {!isAllSelected && totalCount > 0 && (
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Select all
            </button>
          )}
          {selectedCount > 0 && (
            <button
              type="button"
              onClick={handleDeselectAll}
              className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Deselect all
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => dispatch(startAllTimers())}
            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            aria-label="Start all selected timers"
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            Start All
          </button>
          <button
            type="button"
            onClick={() => dispatch(pauseAllTimers())}
            className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
            aria-label="Pause all selected timers"
          >
            <Pause className="w-4 h-4" aria-hidden="true" />
            Pause All
          </button>
          <button
            type="button"
            onClick={() => dispatch(resetAllTimers())}
            className="flex items-center gap-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
            aria-label="Reset all selected timers"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleBulkDelete}
            className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            aria-label="Delete all selected timers"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};
