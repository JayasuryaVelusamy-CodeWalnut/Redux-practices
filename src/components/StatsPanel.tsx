import React from 'react';
import type { DashboardStats } from '../types/timer';
import { formatTime } from '../utils/timerUtils';
import { Clock, Play, Pause, Timer as TimerIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface StatsPanelProps {
  stats: DashboardStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const { colorTheme } = useTheme();

  const themeTotalTimeColors = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-400',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-700 dark:text-green-400',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-700 dark:text-red-400',
    },
  };

  const currentTheme = themeTotalTimeColors[colorTheme];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div
        className={`border-2 rounded-xl p-5 shadow-soft hover:shadow-medium transition-shadow ${currentTheme.bg} ${currentTheme.border}`}
      >
        <div className={`flex items-center gap-2 mb-2 ${currentTheme.text}`}>
          <TimerIcon className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium">Total Timers</span>
        </div>
        <div className={`text-3xl font-bold ${currentTheme.text}`}>
          {stats.totalTimers}
        </div>
      </div>

      <div
        className={`border-2 rounded-xl p-5 shadow-soft hover:shadow-medium transition-shadow ${currentTheme.bg} ${currentTheme.border}`}
      >
        <div className={`flex items-center gap-2 mb-2 ${currentTheme.text}`}>
          <Play className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium">Running</span>
        </div>
        <div className={`text-3xl font-bold ${currentTheme.text}`}>
          {stats.runningCount}
        </div>
      </div>

      <div
        className={`border-2 rounded-xl p-5 shadow-soft hover:shadow-medium transition-shadow ${currentTheme.bg} ${currentTheme.border}`}
      >
        <div className={`flex items-center gap-2 mb-2 ${currentTheme.text}`}>
          <Pause className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium">Paused</span>
        </div>
        <div className={`text-3xl font-bold ${currentTheme.text}`}>
          {stats.pausedCount}
        </div>
      </div>

      <div
        className={`border-2 rounded-xl p-5 shadow-soft hover:shadow-medium transition-shadow ${currentTheme.bg} ${currentTheme.border}`}
      >
        <div className={`flex items-center gap-2 mb-2 ${currentTheme.text}`}>
          <Clock className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium">Total Time</span>
        </div>
        <div className={`text-lg font-bold ${currentTheme.text}`}>
          {formatTime(stats.totalElapsed)}
        </div>
      </div>

      <div
        className={`border-2 rounded-xl p-5 shadow-soft hover:shadow-medium transition-shadow ${currentTheme.bg} ${currentTheme.border}`}
      >
        <div className={`flex items-center gap-2 mb-2 ${currentTheme.text}`}>
          <Clock className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium">Longest</span>
        </div>
        <div className={`text-sm font-bold ${currentTheme.text}`}>
          {stats.longestRunningTimer ? stats.longestRunningTimer.name : 'N/A'}
        </div>
      </div>
    </div>
  );
};
