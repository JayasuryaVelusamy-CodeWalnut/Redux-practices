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
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8"
      aria-label="Timer statistics"
    >
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-lg">
            <TimerIcon
              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide">
            Total
          </span>
        </div>
        <div
          className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-600"
          aria-label={`${stats.totalTimers} total timers`}
        >
          {stats.totalTimers}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-green-300 hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-lg">
            <Play
              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-green-800 uppercase tracking-wide">
            Running
          </span>
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-green-700">
          {stats.runningCount}
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-yellow-300 hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg sm:rounded-xl shadow-lg">
            <Pause
              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-yellow-800 uppercase tracking-wide">
            Paused
          </span>
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-700">
          {stats.pausedCount}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-blue-300 hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-lg">
            <Clock
              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-wide">
            Total Time
          </span>
        </div>
        <div className="text-xl sm:text-2xl md:text-2xl font-black text-blue-700">
          {formatTime(stats.totalElapsed)}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-purple-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 col-span-2 sm:col-span-1">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg sm:rounded-xl shadow-lg">
            <Clock
              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-purple-800 uppercase tracking-wide">
            Idle
          </span>
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-purple-700">
          {stats.totalTimers - stats.runningCount - stats.pausedCount}
        </div>
      </div>
    </section>
  );
};
