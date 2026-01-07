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
        isOpen: true,
        title: 'Delete Multiple Timers',
        message: `Are you sure you want to delete ${selectedCount} timer(s)?`,
        kind: 'deleteMany',
        timerIds: selectedIds,
      })
    );
  };

  return (
    <section
      className="bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 rounded-xl shadow-lg p-4 sm:p-5 mb-6 sm:mb-8"
      aria-label="Bulk actions"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={isAllSelected ? handleDeselectAll : handleSelectAll}
              className="w-5 h-5 cursor-pointer text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              aria-label={
                isAllSelected ? 'Deselect all timers' : 'Select all timers'
              }
            />
            <span className="font-bold text-blue-900">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
          {!isAllSelected && totalCount > 0 && (
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-1"
            >
              ✓ Select all
            </button>
          )}
          {selectedCount > 0 && (
            <button
              type="button"
              onClick={handleDeselectAll}
              className="text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-1"
            >
              ✗ Clear selection
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => dispatch(startAllTimers())}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium text-xs sm:text-sm"
            aria-label="Start all selected timers"
          >
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="hidden xs:inline">Start All</span>
            <span className="xs:hidden">Start</span>
          </button>
          <button
            type="button"
            onClick={() => dispatch(pauseAllTimers())}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg hover:from-yellow-600 hover:to-amber-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-medium text-xs sm:text-sm"
            aria-label="Pause all selected timers"
          >
            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="hidden xs:inline">Pause All</span>
            <span className="xs:hidden">Pause</span>
          </button>
          <button
            type="button"
            onClick={() => dispatch(resetAllTimers())}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-500 to-slate-500 text-white rounded-lg hover:from-gray-600 hover:to-slate-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium text-xs sm:text-sm"
            aria-label="Reset all selected timers"
          >
            <RotateCcw
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              aria-hidden="true"
            />
            Reset
          </button>
          <button
            type="button"
            onClick={handleBulkDelete}
            className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm font-medium"
            aria-label="Delete all selected timers"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};
