import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectFilteredAndSortedTimers } from '../store/selectors';
import { CardRedux } from './CardRedux';

export const TimerListRedux: React.FC = () => {
  const timers = useAppSelector(selectFilteredAndSortedTimers);
  const [tick, setTick] = useState(0);
  const hasRunningTimers = timers.some((timer) => timer.status === 'running');

  useEffect(() => {
    if (hasRunningTimers) {
      const interval = setInterval(() => {
        setTick((prev) => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [hasRunningTimers]);

  if (timers.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-xl p-16 text-center border-2 border-blue-200">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No Timers Yet
          </h3>
          <p className="text-gray-600 mb-2 text-lg">
            Create your first timer to start tracking your productivity!
          </p>
          <p className="text-sm text-gray-500">
            Or adjust your filters to see existing timers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {timers.map((timer) => (
        <CardRedux key={timer.id} timerId={timer.id} tick={tick} />
      ))}
    </div>
  );
};
