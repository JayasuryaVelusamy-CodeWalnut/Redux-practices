import { createAsyncThunk } from '@reduxjs/toolkit';
import { timerApi } from '../../services/timerApi';
import type { Timer } from '../../types/timer';

export const fetchTimers = createAsyncThunk(
  'timers/fetchTimers',
  async (_, { rejectWithValue }) => {
    try {
      const timers = await timerApi.fetchTimers();
      return timers;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch timers';
      return rejectWithValue(message);
    }
  }
);

export const createTimerAsync = createAsyncThunk(
  'timers/createTimer',
  async (timer: Timer, { rejectWithValue }) => {
    try {
      const created = await timerApi.createTimer(timer);
      return created;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to create timer';
      return rejectWithValue(message);
    }
  }
);

export const updateTimerAsync = createAsyncThunk(
  'timers/updateTimer',
  async (
    { id, updates }: { id: string; updates: Partial<Timer> },
    { rejectWithValue }
  ) => {
    try {
      const updated = await timerApi.updateTimer(id, updates);
      return updated;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update timer';
      return rejectWithValue(message);
    }
  }
);

export const bulkUpdateTimersAsync = createAsyncThunk(
  'timers/bulkUpdate',
  async (
    { ids, updates }: { ids: string[]; updates: Partial<Timer> },
    { rejectWithValue }
  ) => {
    try {
      const updated = await timerApi.bulkUpdateTimers(ids, updates);
      return updated;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to bulk update timers';
      return rejectWithValue(message);
    }
  }
);

export const deleteTimersAsync = createAsyncThunk(
  'timers/deleteTimers',
  async (ids: string[], { rejectWithValue }) => {
    try {
      await timerApi.deleteTimers(ids);
      return ids;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to delete timers';
      return rejectWithValue(message);
    }
  }
);
