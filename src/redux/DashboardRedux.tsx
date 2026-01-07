import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectFilteredAndSortedTimers,
  selectDashboardStats,
  selectTimersLoading,
  selectTimersError,
} from '../store/selectors';
import { fetchTimers, createTimerAsync } from '../store/thunks/timerThunks';
import { tickNow } from '../store/slices/uiSlice';
import { createNewTimer } from '../utils/timerUtils';
import { StatsPanel } from '../components/stats/StatsPanel/StatsPanel';
import { ControlBarRedux } from './ControlBarRedux';
import { BulkActionBarRedux } from './BulkActionBarRedux';
import { TimerListRedux } from './TimerListRedux';
import { ModalRedux } from './ModalRedux';
import { Loader2, AlertCircle } from 'lucide-react';

export const DashboardRedux: React.FC = () => {
  const dispatch = useAppDispatch();

  const filteredTimers = useAppSelector(selectFilteredAndSortedTimers);
  const stats = useAppSelector(selectDashboardStats);
  const isLoading = useAppSelector(selectTimersLoading);
  const error = useAppSelector(selectTimersError);
  const totalTimers = useAppSelector((state) => state.timers.items.length);

  useEffect(() => {
    dispatch(fetchTimers());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tickNow());
    }, 250);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleCreateTimer = useCallback(() => {
    const newTimer = createNewTimer(`Timer ${totalTimers + 1}`);
    dispatch(createTimerAsync(newTimer));
  }, [dispatch, totalTimers]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-blue-700 font-medium">Loading timers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 md:mb-10">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden">
            {/* Header decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <div className="bg-blue-500 bg-opacity-30 p-3 sm:p-4 rounded-2xl backdrop-blur-sm border-2 border-white border-opacity-30">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                    Timer Dashboard
                  </h1>
                  <p className="text-blue-100 text-base sm:text-lg font-medium">
                    📊 Track your time, boost your productivity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-md flex items-center gap-3 animate-pulse"
          >
            <AlertCircle className="w-5 h-5 text-red-600" aria-hidden="true" />
            <span className="text-red-800 font-medium">{error}</span>
          </div>
        )}

        <StatsPanel stats={stats} />

        <ControlBarRedux
          onCreateTimer={handleCreateTimer}
          timersCount={filteredTimers.length}
        />

        <BulkActionBarRedux />

        <TimerListRedux />

        <ModalRedux />
      </div>
    </div>
  );
};
