import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { FilterState, ApiState } from '../types/timer';
import { timerReducer } from '../reducers/timerReducer';
import { createNewTimer, calculateDashboardStats } from '../utils/timerUtils';
import { timerApi } from '../services/timerApi';
import { StatsPanel } from './StatsPanel';
import { ControlBar } from './ControlBar';
import { BulkActionBar } from './BulkActionBar';
import { TimerList } from './TimerList';
import { ConfirmationModal } from './ConfirmationModal';
import { Loader2, AlertCircle } from 'lucide-react';

// ⚠️ WARNING: This is Phase 1 implementation with intentional anti-patterns!
// Problems to observe:
// 1. All state managed in one component - state explosion
// 2. Props drilling to deeply nested components
// 3. Derived state calculated multiple times
// 4. Complex reducer logic in single file
// 5. Difficult to test - everything coupled

export const Dashboard: React.FC = () => {
  // Multiple pieces of state - state explosion!
  const [timers, dispatch] = useReducer(timerReducer, []);
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    searchQuery: '',
    sortBy: 'createdAt',
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [apiState, setApiState] = useState<ApiState>({
    isLoading: false,
    error: null,
  });
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Load timers on mount
  useEffect(() => {
    const loadTimers = async () => {
      setApiState({ isLoading: true, error: null });
      try {
        const data = await timerApi.fetchTimers();
        dispatch({ type: 'SET_TIMERS', payload: data });
      } catch {
        setApiState({
          isLoading: false,
          error: 'Failed to load timers',
        });
      } finally {
        setApiState({ isLoading: false, error: null });
      }
    };
    loadTimers();
  }, []);

  // Sync timers to localStorage whenever they change
  useEffect(() => {
    if (timers.length > 0) {
      localStorage.setItem('timers', JSON.stringify(timers));
    }
  }, [timers]);

  // Create new timer
  const handleCreateTimer = async () => {
    const newTimer = createNewTimer(`Timer ${timers.length + 1}`);
    dispatch({ type: 'ADD_TIMER', payload: newTimer });

    // Simulate API call
    try {
      await timerApi.createTimer(newTimer);
    } catch (error) {
      console.error('Failed to create timer:', error);
    }
  };

  // Timer actions - these will be passed down multiple levels (prop drilling!)
  const handleStart = useCallback((id: string) => {
    dispatch({ type: 'START_TIMER', payload: id });
  }, []);

  const handlePause = useCallback((id: string) => {
    dispatch({ type: 'PAUSE_TIMER', payload: id });
  }, []);

  const handleReset = useCallback((id: string) => {
    dispatch({ type: 'RESET_TIMER', payload: id });
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      setConfirmModal({
        isOpen: true,
        title: 'Delete Timer',
        message: 'Are you sure you want to delete this timer?',
        onConfirm: () => {
          dispatch({ type: 'DELETE_TIMER', payload: id });
          setSelectedIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
          setConfirmModal({ ...confirmModal, isOpen: false });
        },
      });
    },
    [confirmModal]
  );

  const handleEdit = useCallback((id: string, name: string) => {
    dispatch({ type: 'UPDATE_TIMER', payload: { id, updates: { name } } });
  }, []);

  // Selection handlers
  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedIds(new Set(timers.map((t) => t.id)));
  }, [timers]);

  const handleDeselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  // Bulk actions
  const handleBulkStart = useCallback(() => {
    selectedIds.forEach((id) => {
      dispatch({ type: 'START_TIMER', payload: id });
    });
  }, [selectedIds]);

  const handleBulkPause = useCallback(() => {
    selectedIds.forEach((id) => {
      dispatch({ type: 'PAUSE_TIMER', payload: id });
    });
  }, [selectedIds]);

  const handleBulkReset = useCallback(() => {
    selectedIds.forEach((id) => {
      dispatch({ type: 'RESET_TIMER', payload: id });
    });
  }, [selectedIds]);

  const handleBulkDelete = useCallback(() => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Multiple Timers',
      message: `Are you sure you want to delete ${selectedIds.size} timer(s)?`,
      onConfirm: () => {
        dispatch({ type: 'DELETE_TIMERS', payload: Array.from(selectedIds) });
        setSelectedIds(new Set());
        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
  }, [selectedIds, confirmModal]);

  // Calculate stats - this is recalculated on every render! (performance issue)
  const stats = calculateDashboardStats(timers);

  // Filter timers for count display
  const filteredTimers = timers.filter((timer) => {
    if (filters.status !== 'all' && timer.status !== filters.status) {
      return false;
    }
    if (
      filters.searchQuery &&
      !timer.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  if (apiState.isLoading) {
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
          <p className="text-gray-600">
            Phase 1: Without Redux (Observe the prop drilling!)
          </p>
        </header>

        {/* Error Banner */}
        {apiState.error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{apiState.error}</span>
          </div>
        )}

        {/* Stats Panel - receives stats that are recalculated every render */}
        <StatsPanel stats={stats} />

        {/* Control Bar - receives multiple props */}
        <ControlBar
          filters={filters}
          onFilterChange={setFilters}
          onCreateTimer={handleCreateTimer}
          timersCount={filteredTimers.length}
        />

        {/* Bulk Action Bar - receives many callback props */}
        <BulkActionBar
          selectedCount={selectedIds.size}
          totalCount={timers.length}
          isAllSelected={
            selectedIds.size === timers.length && timers.length > 0
          }
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onBulkStart={handleBulkStart}
          onBulkPause={handleBulkPause}
          onBulkReset={handleBulkReset}
          onBulkDelete={handleBulkDelete}
        />

        {/* Timer List - prop drilling begins here! */}
        <TimerList
          timers={timers}
          selectedIds={selectedIds}
          filters={filters}
          onToggleSelect={handleToggleSelect}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          isDangerous
        />
      </div>
    </div>
  );
};
