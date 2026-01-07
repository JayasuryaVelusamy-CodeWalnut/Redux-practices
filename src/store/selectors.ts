import { createSelector } from 'reselect';
import type { RootState } from './index';
import type { Timer } from '../types/timer';
import { calculateElapsed, calculateDashboardStats } from '../utils/timerUtils';
import { selectNowMs } from './slices/uiSlice';

export const selectTimers = (state: RootState) => state.timers.items;
export const selectFilters = (state: RootState) => state.filters;
export const selectSelectedIds = (state: RootState) =>
  state.selection.selectedIds;
export const selectTimersLoading = (state: RootState) => state.timers.isLoading;
export const selectTimersError = (state: RootState) => state.timers.error;

export const selectFilteredAndSortedTimers = createSelector(
  [selectTimers, selectFilters, selectNowMs],
  (timers: Timer[], filters: ReturnType<typeof selectFilters>) => {
    const filtered = timers.filter((timer) => {
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

    const sorted = [...filtered].sort((timerA, timerB) => {
      switch (filters.sortBy) {
        case 'createdAt':
          return timerB.createdAt - timerA.createdAt;
        case 'elapsed':
          return calculateElapsed(timerB) - calculateElapsed(timerA);
        case 'name':
          return timerA.name.localeCompare(timerB.name);
        default:
          return 0;
      }
    });

    return sorted;
  }
);

export const selectDashboardStats = createSelector(
  [selectTimers, selectNowMs],
  (timers: Timer[]) => {
    return calculateDashboardStats(timers);
  }
);

export const selectIsAllSelected = createSelector(
  [selectTimers, selectSelectedIds],
  (timers: Timer[], selectedIds: string[]) => {
    return timers.length > 0 && selectedIds.length === timers.length;
  }
);

export const selectSelectedTimers = createSelector(
  [selectTimers, selectSelectedIds],
  (timers: Timer[], selectedIds: string[]) => {
    return timers.filter((timer) => selectedIds.includes(timer.id));
  }
);

// Memoized selector factory for finding a timer by ID
export const makeSelectTimerById = () =>
  createSelector(
    [selectTimers, (_state: RootState, timerId: string) => timerId],
    (timers, timerId) => timers.find((timer) => timer.id === timerId)
  );

// Memoized selector factory for checking if a timer is selected
export const makeSelectIsTimerSelected = () =>
  createSelector(
    [selectSelectedIds, (_state: RootState, timerId: string) => timerId],
    (selectedIds, timerId) => selectedIds.includes(timerId)
  );
