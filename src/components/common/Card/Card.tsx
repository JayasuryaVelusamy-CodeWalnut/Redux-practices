import React, { useState, useEffect, useMemo } from 'react';
import type { Timer } from '../../../types/timer';
import { calculateElapsed, formatTime } from '../../../utils/timerUtils';
import { Play, Pause, RotateCcw, Trash2, Edit2 } from 'lucide-react';

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

export const Card: React.FC<TimerCardProps> = ({
  timer,
  isSelected,
  onToggleSelect,
  onStart,
  onPause,
  onReset,
  onDelete,
  onEdit,
}) => {
  const [tick, setTick] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(timer.name);

  const currentElapsed = useMemo(() => calculateElapsed(timer), [timer, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timer.status === 'running') {
      const interval = setInterval(() => {
        setTick((previousTick) => previousTick + 1);
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
    idle: 'border-gray-300 bg-white',
    running: 'border-green-500 bg-green-50',
    paused: 'border-yellow-500 bg-yellow-50',
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all ${
        statusColors[timer.status]
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(timer.id)}
            className="w-4 h-4 cursor-pointer"
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
              className="flex-1 px-2 py-1 border rounded"
              autoFocus
            />
          ) : (
            <h3 className="text-lg font-semibold flex-1">{timer.name}</h3>
          )}
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="text-3xl font-mono text-center mb-4">
        {formatTime(currentElapsed)}
      </div>

      <div className="flex items-center justify-center gap-2">
        {timer.status !== 'running' ? (
          <button
            onClick={() => onStart(timer.id)}
            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Play className="w-4 h-4" />
            Start
          </button>
        ) : (
          <button
            onClick={() => onPause(timer.id)}
            className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            <Pause className="w-4 h-4" />
            Pause
          </button>
        )}
        <button
          onClick={() => onReset(timer.id)}
          className="flex items-center gap-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(timer.id)}
          className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-500 text-center">
        Status: <span className="font-semibold">{timer.status}</span>
      </div>
    </div>
  );
};
