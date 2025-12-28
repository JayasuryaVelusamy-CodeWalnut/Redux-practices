import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectFilteredAndSortedTimers,
  selectDashboardStats,
  selectTimersLoading,
  selectTimersError,
} from '../store/selectors';
import { fetchTimers } from '../store/thunks/timerThunks';
import { addTimer } from '../store/slices/timersSlice';
import { createNewTimer } from '../utils/timerUtils';
import { StatsPanel } from './StatsPanel';
import { ControlBarRedux } from './ControlBarRedux';
import { BulkActionBarRedux } from './BulkActionBarRedux';
import { TimerListRedux } from './TimerListRedux';
import { ConfirmationModalRedux } from './ConfirmationModalRedux';
import { Loader2, AlertCircle } from 'lucide-react';

export const DashboardRedux: React.FC = () => {
  const dispatch = useAppDispatch();

  const filteredTimers = useAppSelector(selectFilteredAndSortedTimers);
  const stats = useAppSelector(selectDashboardStats);
  const isLoading = useAppSelector(selectTimersLoading);
  const error = useAppSelector(selectTimersError);

  useEffect(() => {
    dispatch(fetchTimers());
  }, [dispatch]);

  const handleCreateTimer = useCallback(() => {
    const timersCount = filteredTimers.length;
    const newTimer = createNewTimer(`Timer ${timersCount + 1}`);
    dispatch(addTimer(newTimer));
  }, [dispatch, filteredTimers.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Timer & Productivity Dashboard
          </h1>
          <p className="text-green-600 font-semibold">
            ✅ Phase 2: With Redux - No Prop Drilling! Clean Architecture!
          </p>
        </header>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Stats Panel - uses Redux selector directly */}
        <StatsPanel stats={stats} />

        {/* Control Bar - no props needed for state! */}
        <ControlBarRedux
          onCreateTimer={handleCreateTimer}
          timersCount={filteredTimers.length}
        />

        {/* Bulk Action Bar - uses Redux directly */}
        <BulkActionBarRedux />

        {/* Timer List - components connect to Redux themselves! */}
        <TimerListRedux />

        {/* Confirmation Modal - managed by Redux UI state */}
        <ConfirmationModalRedux />
      </div>
    </div>
  );
};
