import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Timer } from '../../types/timer';

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
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },
    deleteTimer: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    deleteTimers: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter((t) => !action.payload.includes(t.id));
    },
    setTimers: (state, action: PayloadAction<Timer[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    startTimer: (state, action: PayloadAction<string>) => {
      const timer = state.items.find((t) => t.id === action.payload);
      if (timer) {
        timer.status = 'running';
        timer.startTime = Date.now();
      }
    },
    pauseTimer: (state, action: PayloadAction<string>) => {
      const timer = state.items.find((t) => t.id === action.payload);
      if (timer && timer.status === 'running' && timer.startTime) {
        timer.elapsed = timer.elapsed + (Date.now() - timer.startTime);
        timer.status = 'paused';
        timer.startTime = null;
      }
    },
    resetTimer: (state, action: PayloadAction<string>) => {
      const timer = state.items.find((t) => t.id === action.payload);
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

export default timersSlice.reducer;
