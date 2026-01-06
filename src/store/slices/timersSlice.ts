import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Timer } from '../../types/timer';
import {
  fetchTimers as fetchTimersThunk,
  createTimerAsync as createTimerThunk,
  updateTimerAsync as updateTimerThunk,
  bulkUpdateTimersAsync as bulkUpdateTimersThunk,
  deleteTimersAsync as deleteTimersThunk,
} from '../thunks/timerThunks';

interface TimersState {
  items: Timer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TimersState = {
  items: [],
  isLoading: false,
  error: null,
};

const timersSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    addTimer: (state, action: PayloadAction<Timer>) => {
      state.items.push(action.payload);
    },
    updateTimer: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Timer> }>
    ) => {
      const index = state.items.findIndex(
        (timer) => timer.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },
    deleteTimer: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((timer) => timer.id !== action.payload);
    },
    deleteTimers: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(
        (timer) => !action.payload.includes(timer.id)
      );
    },
    setTimers: (state, action: PayloadAction<Timer[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    startTimer: (state, action: PayloadAction<string>) => {
      const timer = state.items.find((timer) => timer.id === action.payload);
      if (timer) {
        timer.status = 'running';
        timer.startTime = Date.now();
      }
    },
    pauseTimer: (state, action: PayloadAction<string>) => {
      const timer = state.items.find((timer) => timer.id === action.payload);
      if (timer?.status === 'running' && timer.startTime) {
        timer.elapsed = timer.elapsed + (Date.now() - timer.startTime);
        timer.status = 'paused';
        timer.startTime = null;
      }
    },
    resetTimer: (state, action: PayloadAction<string>) => {
      const timer = state.items.find((timer) => timer.id === action.payload);
      if (timer) {
        timer.elapsed = 0;
        timer.startTime = null;
        timer.status = 'idle';
      }
    },

    startAllTimers: (state) => {
      const now = Date.now();
      state.items.forEach((timer) => {
        if (timer.status !== 'running') {
          timer.status = 'running';
          timer.startTime = now;
        }
      });
    },
    pauseAllTimers: (state) => {
      const now = Date.now();
      state.items.forEach((timer) => {
        if (timer.status === 'running' && timer.startTime) {
          timer.elapsed = timer.elapsed + (now - timer.startTime);
          timer.status = 'paused';
          timer.startTime = null;
        }
      });
    },
    resetAllTimers: (state) => {
      state.items.forEach((timer) => {
        timer.elapsed = 0;
        timer.startTime = null;
        timer.status = 'idle';
      });
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTimersThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTimersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? 'Failed to fetch timers';
      })
      .addCase(createTimerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTimerThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createTimerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? 'Failed to create timer';
      })
      .addCase(updateTimerThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex((timer) => timer.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(bulkUpdateTimersThunk.fulfilled, (state, action) => {
        action.payload.forEach((updatedTimer) => {
          const index = state.items.findIndex((timer) => timer.id === updatedTimer.id);
          if (index !== -1) {
            state.items[index] = updatedTimer;
          }
        });
      })
      .addCase(deleteTimersThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((timer) => !action.payload.includes(timer.id));
      });
  },
});

export const {
  addTimer,
  updateTimer,
  deleteTimer,
  deleteTimers,
  setTimers,
  startTimer,
  pauseTimer,
  resetTimer,
  startAllTimers,
  pauseAllTimers,
  resetAllTimers,
  setLoading,
  setError,
} = timersSlice.actions;

export const selectTimersState = (state: { timers: TimersState }) =>
  state.timers;
export const selectAllTimers = (state: { timers: TimersState }) =>
  state.timers.items;
export const selectTimersLoading = (state: { timers: TimersState }) =>
  state.timers.isLoading;
export const selectTimersError = (state: { timers: TimersState }) =>
  state.timers.error;

export default timersSlice.reducer;
