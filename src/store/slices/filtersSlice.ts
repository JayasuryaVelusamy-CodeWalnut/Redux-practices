import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FilterState, SortBy, TimerStatus } from '../../types/timer';

const initialState: FilterState = {
  status: 'all',
  searchQuery: '',
  sortBy: 'createdAt',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<TimerStatus>) => {
      state.status = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setFilters: (_state, action: PayloadAction<FilterState>) => {
      return action.payload;
    },
    resetFilters: () => {
      return { ...initialState };
    },
  },
});

export const {
  setStatusFilter,
  setSearchQuery,
  setSortBy,
  setFilters,
  resetFilters,
} = filtersSlice.actions;

import type { RootState } from '../index';

export const selectFiltersState = (state: RootState) => state.filters;
export const selectStatusFilter = (state: RootState) => state.filters.status;
export const selectSearchQuery = (state: RootState) =>
  state.filters.searchQuery;
export const selectSortBy = (state: RootState) => state.filters.sortBy;

export default filtersSlice.reducer;
