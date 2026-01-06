import React, { useState, useEffect, useMemo } from 'react';
import type { Timer } from '../types/timer';
import { calculateElapsed, formatTime } from '../utils/timerUtils';
import { Play, Pause, RotateCcw, Trash2, Edit2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface TimerCardProps {
  timer: Timer;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}

export const TimerCard: React.FC<TimerCardProps> = ({
  timer,
  isSelected,
  onToggleSelect,
  onStart,
  onPause,
  onReset,
  onDelete,
  onEdit,
}) => {
  const { colorTheme } = useTheme();
  const [tick, setTick] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(timer.name);

  // Use useMemo to calculate elapsed time based on tick
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentElapsed = useMemo(() => calculateElapsed(timer), [timer, tick]);

  useEffect(() => {
    if (timer.status === 'running') {
      const interval = setInterval(() => {
        setTick((t) => t + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [timer.status]);

  const handleSaveEdit = () => {
    if (editName.trim()) {
      onEdit(timer.id, editName.trim());
    }
    setIsEditing(false);
  };

  const statusColors = {
    idle: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:shadow-soft',
    running:
      'border-success-500 dark:border-success-600 bg-success-50 dark:bg-success-900/20 shadow-soft',
    paused:
      'border-warning-500 dark:border-warning-600 bg-warning-50 dark:bg-warning-900/20 shadow-soft',
  };

  const statusText = {
    idle: 'Timer is idle',
    running: 'Timer is running',
    paused: 'Timer is paused',
  };

  const themeRingColors = {
    blue: 'ring-blue-400 dark:ring-blue-500',
    green: 'ring-green-400 dark:ring-green-500',
    red: 'ring-red-400 dark:ring-red-500',
  };

  const themeCheckboxColors = {
    blue: 'text-blue-600 focus:ring-blue-500',
    green: 'text-green-600 focus:ring-green-500',
    red: 'text-red-600 focus:ring-red-500',
  };

  const themeInputColors = {
    blue: 'border-blue-300 dark:border-blue-600 focus:ring-blue-500',
    green: 'border-green-300 dark:border-green-600 focus:ring-green-500',
    red: 'border-red-300 dark:border-red-600 focus:ring-red-500',
  };

  return (
    <article
      className={`border-2 rounded-xl p-6 transition-all duration-200 ${
        statusColors[timer.status]
      } ${isSelected ? `ring-4 ring-offset-2 ${themeRingColors[colorTheme]}` : ''}`}
      aria-label={`Timer: ${timer.name}`}
      aria-describedby={`timer-status-${timer.id}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(timer.id)}
            className={`w-5 h-5 cursor-pointer rounded border-gray-300 focus:ring-2 focus:ring-offset-2 transition-colors ${themeCheckboxColors[colorTheme]}`}
            aria-label={`Select timer ${timer.name}`}
          />
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
                if (e.key === 'Escape') {
                  setIsEditing(false);
                  setEditName(timer.name);
                }
              }}
              className={`flex-1 px-3 py-2 border-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent ${themeInputColors[colorTheme]}`}
              autoFocus
              aria-label="Edit timer name"
            />
          ) : (
            <h3 className="text-lg font-semibold flex-1 text-gray-800 dark:text-gray-200">
              {timer.name}
            </h3>
          )}
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              colorTheme === 'blue'
                ? 'hover:bg-blue-100 dark:hover:bg-blue-900/30 focus:ring-blue-500'
                : colorTheme === 'green'
                  ? 'hover:bg-green-100 dark:hover:bg-green-900/30 focus:ring-green-500'
                  : 'hover:bg-red-100 dark:hover:bg-red-900/30 focus:ring-red-500'
            }`}
            aria-label={`Edit ${timer.name}`}
            title="Edit timer name"
          >
            <Edit2
              className="w-4 h-4 text-gray-600 dark:text-gray-400"
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      <div
        className="text-4xl font-mono text-center mb-6 font-bold text-gray-900 dark:text-gray-100 tabular-nums"
        role="timer"
        aria-live="off"
        aria-label={`Elapsed time: ${formatTime(currentElapsed)}`}
      >
        {formatTime(currentElapsed)}
      </div>

      <div
        className="flex items-center justify-center gap-2 mb-4"
        role="group"
        aria-label="Timer controls"
      >
        {timer.status !== 'running' ? (
          <button
            onClick={() => onStart(timer.id)}
            className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm ${
              colorTheme === 'blue'
                ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700'
                : colorTheme === 'green'
                  ? 'bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700'
                  : 'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700'
            }`}
            aria-label={`Start ${timer.name}`}
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={() => onPause(timer.id)}
            className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm ${
              colorTheme === 'blue'
                ? 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600'
                : colorTheme === 'green'
                  ? 'bg-green-400 hover:bg-green-500 active:bg-green-600 focus:ring-green-400 dark:bg-green-500 dark:hover:bg-green-600'
                  : 'bg-red-400 hover:bg-red-500 active:bg-red-600 focus:ring-red-400 dark:bg-red-500 dark:hover:bg-red-600'
            }`}
            aria-label={`Pause ${timer.name}`}
          >
            <Pause className="w-4 h-4" aria-hidden="true" />
            <span>Pause</span>
          </button>
        )}
        <button
          onClick={() => onReset(timer.id)}
          className="flex items-center gap-1 px-4 py-2.5 bg-gray-500 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 active:bg-gray-700 dark:active:bg-gray-800 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 shadow-sm"
          aria-label={`Reset ${timer.name}`}
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          onClick={() => onDelete(timer.id)}
          className="flex items-center gap-1 px-4 py-2.5 bg-danger-500 dark:bg-danger-600 text-white rounded-lg hover:bg-danger-600 dark:hover:bg-danger-700 active:bg-danger-700 dark:active:bg-danger-800 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-danger-500 dark:focus:ring-danger-400 focus:ring-offset-2 shadow-sm"
          aria-label={`Delete ${timer.name}`}
          title="Delete timer"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <div
        id={`timer-status-${timer.id}`}
        className="text-sm text-gray-600 dark:text-gray-400 text-center bg-gray-100 dark:bg-gray-700 rounded-lg py-2 px-3"
        role="status"
        aria-live="polite"
      >
        Status: <span className="font-semibold capitalize">{timer.status}</span>
        <span className="sr-only">{statusText[timer.status]}</span>
      </div>
    </article>
  );
};
