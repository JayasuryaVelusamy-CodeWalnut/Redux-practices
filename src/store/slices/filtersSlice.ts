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
      return initialState;
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

export default filtersSlice.reducer;
