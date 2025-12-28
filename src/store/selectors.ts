import { createSelector } from 'reselect';
import type { RootState } from '../store';
import { calculateElapsed, calculateDashboardStats } from '../utils/timerUtils';

export const selectTimers = (state: RootState) => state.timers.items;
export const selectFilters = (state: RootState) => state.filters;
export const selectSelectedIds = (state: RootState) =>
  state.selection.selectedIds;
export const selectTimersLoading = (state: RootState) => state.timers.isLoading;
export const selectTimersError = (state: RootState) => state.timers.error;

export const selectFilteredAndSortedTimers = createSelector(
  [selectTimers, selectFilters],
  (timers, filters) => {
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

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'createdAt':
          return b.createdAt - a.createdAt;
        case 'elapsed':
          return calculateElapsed(b) - calculateElapsed(a);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }
);

export const selectDashboardStats = createSelector([selectTimers], (timers) => {
  return calculateDashboardStats(timers);
});

export const selectIsAllSelected = createSelector(
  [selectTimers, selectSelectedIds],
  (timers, selectedIds) => {
    return timers.length > 0 && selectedIds.length === timers.length;
  }
);

export const selectSelectedTimers = createSelector(
  [selectTimers, selectSelectedIds],
  (timers, selectedIds) => {
    return timers.filter((timer) => selectedIds.includes(timer.id));
  }
);
