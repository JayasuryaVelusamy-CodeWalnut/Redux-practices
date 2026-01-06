import React, { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  startTimer,
  pauseTimer,
  resetTimer,
  updateTimer,
} from '../store/slices/timersSlice';
import { toggleSelection } from '../store/slices/selectionSlice';
import { openConfirmModal } from '../store/slices/uiSlice';
import { calculateElapsed, formatTime } from '../utils/timerUtils';
import { Play, Pause, RotateCcw, Trash2, Edit2 } from 'lucide-react';

interface TimerCardReduxProps {
  timerId: string;
}

export const CardRedux: React.FC<TimerCardReduxProps> = ({ timerId }) => {
  const dispatch = useAppDispatch();

  const timer = useAppSelector((state) =>
    state.timers.items.find((timer) => timer.id === timerId)
  );
  const isSelected = useAppSelector((state) =>
    state.selection.selectedIds.includes(timerId)
  );

  const [tick, setTick] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(timer?.name || '');

  const currentElapsed = useMemo(
    () => (timer ? calculateElapsed(timer) : 0),
    [timer, tick] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (timer?.status === 'running') {
      const interval = setInterval(() => {
        setTick((previousTick) => previousTick + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [timer?.status]);

  if (!timer) return null;

  const handleSaveEdit = () => {
    if (editName.trim()) {
      dispatch(
        updateTimer({ id: timerId, updates: { name: editName.trim() } })
      );
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(
      openConfirmModal({
        title: 'Delete Timer',
        message: 'Are you sure you want to delete this timer?',
        onConfirmAction: 'timers/deleteTimer',
        actionPayload: timerId,
      })
    );
  };

  const statusColors: Record<string, string> = {
    idle: 'border-gray-300 bg-white',
    running: 'border-green-500 bg-green-50',
    paused: 'border-yellow-500 bg-yellow-50',
  };

  return (
    <article
      className={`border-2 rounded-lg p-4 transition-all ${
        statusColors[timer.status]
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      aria-label={`Timer: ${timer.name}`}
    >
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => dispatch(toggleSelection(timerId))}
            className="w-4 h-4 cursor-pointer"
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
                if (event.key === 'Escape') setIsEditing(false);
              }}
              className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Edit timer name"
              autoFocus
            />
          ) : (
            <h3 className="text-lg font-semibold flex-1">{timer.name}</h3>
          )}
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Edit ${timer.name}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </header>

      <div
        className="text-3xl font-mono text-center mb-4"
        role="timer"
        aria-live="off"
        aria-label={`Elapsed time: ${formatTime(currentElapsed)}`}
      >
        {formatTime(currentElapsed)}
      </div>

      <div className="flex items-center justify-center gap-2">
        {timer.status === 'running' ? (
          <button
            type="button"
            onClick={() => dispatch(pauseTimer(timerId))}
            className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label={`Pause ${timer.name}`}
          >
            <Pause className="w-4 h-4" aria-hidden="true" />
            Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={() => dispatch(startTimer(timerId))}
            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label={`Start ${timer.name}`}
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            Start
          </button>
        )}
        <button
          type="button"
          onClick={() => dispatch(resetTimer(timerId))}
          className="flex items-center gap-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label={`Reset ${timer.name}`}
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Delete ${timer.name}`}
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <footer className="mt-3 text-xs text-gray-500 text-center">
        Status: <span className="font-semibold">{timer.status}</span>
      </footer>
    </article>
  );
};
