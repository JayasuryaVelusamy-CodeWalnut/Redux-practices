import React, { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  startTimer,
  pauseTimer,
  resetTimer,
} from '../store/slices/timersSlice';
import { updateTimerAsync } from '../store/thunks/timerThunks';
import { toggleSelection } from '../store/slices/selectionSlice';
import { openConfirmModal } from '../store/slices/uiSlice';
import {
  makeSelectTimerById,
  makeSelectIsTimerSelected,
} from '../store/selectors';
import { calculateElapsed, formatTime } from '../utils/timerUtils';
import { Play, Pause, RotateCcw, Trash2, Edit2 } from 'lucide-react';

interface TimerCardReduxProps {
  timerId: string;
  tick: number;
}

export const CardRedux: React.FC<TimerCardReduxProps> = ({ timerId, tick }) => {
  const dispatch = useAppDispatch();

  // Create memoized selectors once per component instance
  const selectTimerById = useMemo(makeSelectTimerById, []);
  const selectIsTimerSelected = useMemo(makeSelectIsTimerSelected, []);

  const timer = useAppSelector((state) => selectTimerById(state, timerId));
  const isSelected = useAppSelector((state) =>
    selectIsTimerSelected(state, timerId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(timer?.name ?? '');

  const currentElapsed = useMemo(
    () => (timer ? calculateElapsed(timer) : 0),
    // tick is intentionally included to trigger recalculation on running timers
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timer, tick]
  );

  if (!timer) return null;

  const handleSaveEdit = () => {
    if (editName.trim()) {
      dispatch(
        updateTimerAsync({ id: timerId, updates: { name: editName.trim() } })
      );
    } else {
      setEditName(timer?.name ?? '');
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(timer?.name ?? '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(
      openConfirmModal({
        isOpen: true,
        title: 'Delete Timer',
        message: 'Are you sure you want to delete this timer?',
        kind: 'deleteOne',
        timerId: timerId,
      })
    );
  };

  const statusColors: Record<'idle' | 'running' | 'paused', string> = {
    idle: 'border-blue-200 bg-white',
    running: 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50',
    paused: 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50',
  };

  const statusBadge: Record<'idle' | 'running' | 'paused', string> = {
    idle: 'bg-blue-100 text-blue-700',
    running: 'bg-green-100 text-green-700',
    paused: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <article
      className={`border-2 rounded-xl p-4 sm:p-6 transition-all duration-300 shadow-md hover:shadow-xl ${
        statusColors[timer.status]
      } ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-50 shadow-blue-200' : ''}`}
      aria-label={`Timer: ${timer.name}`}
    >
      <header className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => dispatch(toggleSelection(timerId))}
            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
            aria-label={`Select ${timer.name}`}
          />
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(event) => setEditName(event.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleSaveEdit();
                if (event.key === 'Escape') handleCancelEdit();
              }}
              className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-semibold text-gray-800 text-sm sm:text-base"
              aria-label="Edit timer name"
              autoFocus
            />
          ) : (
            <h3 className="text-base sm:text-xl font-bold flex-1 text-gray-800 truncate">
              {timer.name}
            </h3>
          )}
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            aria-label={`Edit ${timer.name}`}
          >
            <Edit2 className="w-5 h-5 text-blue-600" />
          </button>
        )}
      </header>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-4 sm:p-6 mb-3 sm:mb-4 shadow-inner">
        <div
          className="text-3xl sm:text-4xl md:text-5xl font-mono text-center text-white font-bold tracking-wider"
          role="timer"
          aria-live="off"
          aria-label={`Elapsed time: ${formatTime(currentElapsed)}`}
        >
          {formatTime(currentElapsed)}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {timer.status === 'running' ? (
          <button
            type="button"
            onClick={() => dispatch(pauseTimer(timerId))}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg hover:from-yellow-600 hover:to-amber-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-semibold text-sm sm:text-base"
            aria-label={`Pause ${timer.name}`}
          >
            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={() => dispatch(startTimer(timerId))}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-sm sm:text-base"
            aria-label={`Start ${timer.name}`}
          >
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            Start
          </button>
        )}
        <button
          type="button"
          onClick={() => dispatch(resetTimer(timerId))}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-gray-500 to-slate-500 text-white rounded-lg hover:from-gray-600 hover:to-slate-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium text-sm sm:text-base"
          aria-label={`Reset ${timer.name}`}
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium text-sm sm:text-base"
          aria-label={`Delete ${timer.name}`}
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
        </button>
      </div>

      <footer className="mt-4 text-center">
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${statusBadge[timer.status]}`}
        >
          {timer.status}
        </span>
      </footer>
    </article>
  );
};
