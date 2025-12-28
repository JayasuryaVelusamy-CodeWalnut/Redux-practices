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
    dispatch(selectAll(timers.map((t) => t.id)));
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
    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={isAllSelected ? handleDeselectAll : handleSelectAll}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="font-semibold">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
          {!isAllSelected && totalCount > 0 && (
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:underline"
            >
              Select all
            </button>
          )}
          {selectedCount > 0 && (
            <button
              onClick={handleDeselectAll}
              className="text-sm text-blue-600 hover:underline"
            >
              Deselect all
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(startAllTimers())}
            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            <Play className="w-4 h-4" />
            Start All
          </button>
          <button
            onClick={() => dispatch(pauseAllTimers())}
            className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
          >
            <Pause className="w-4 h-4" />
            Pause All
          </button>
          <button
            onClick={() => dispatch(resetAllTimers())}
            className="flex items-center gap-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleBulkDelete}
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
