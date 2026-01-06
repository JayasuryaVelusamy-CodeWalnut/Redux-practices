import React from 'react';
import type { DashboardStats } from '../../../types/timer';
import { formatTime } from '../../../utils/timerUtils';
import { Clock, Play, Pause, Timer as TimerIcon } from 'lucide-react';

interface StatsPanelProps {
  stats: DashboardStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <section
      className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
      aria-label="Timer statistics"
    >
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <TimerIcon className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm">Total Timers</span>
        </div>
        <div
          className="text-2xl font-bold"
          aria-label={`${stats.totalTimers} total timers`}
        >
          {stats.totalTimers}
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-green-700 mb-1">
          <Play className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm">Running</span>
        </div>
        <div className="text-2xl font-bold text-green-700">
          {stats.runningCount}
        </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-yellow-700 mb-1">
          <Pause className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm">Paused</span>
        </div>
        <div className="text-2xl font-bold text-yellow-700">
          {stats.pausedCount}
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-blue-700 mb-1">
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm">Total Time</span>
        </div>
        <div className="text-lg font-bold text-blue-700">
          {formatTime(stats.totalElapsed)}
        </div>
      </div>

      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-purple-700 mb-1">
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm">Longest</span>
        </div>
        <div className="text-sm font-bold text-purple-700">
          {stats.longestRunningTimer ? stats.longestRunningTimer.name : 'N/A'}
        </div>
      </div>
    </section>
  );
};
