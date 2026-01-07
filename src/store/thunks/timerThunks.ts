import { createAsyncThunk } from '@reduxjs/toolkit';
import { timerApi } from '../../services/timerApi';
import type { Timer } from '../../types/timer';

export const fetchTimers = createAsyncThunk<
  Timer[],
  void,
  { rejectValue: string }
>('timers/fetchTimers', async (_, { rejectWithValue }) => {
  try {
    const timers = await timerApi.fetchTimers();
    return timers;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch timers';
    return rejectWithValue(message);
  }
});

export const createTimerAsync = createAsyncThunk<
  Timer,
  Timer,
  { rejectValue: string }
>('timers/createTimer', async (timer: Timer, { rejectWithValue }) => {
  try {
    const created = await timerApi.createTimer(timer);
    return created;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create timer';
    return rejectWithValue(message);
  }
});

export const updateTimerAsync = createAsyncThunk<
  Timer,
  { id: string; updates: Partial<Timer> },
  { rejectValue: string }
>(
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

export const bulkUpdateTimersAsync = createAsyncThunk<
  Timer[],
  { ids: string[]; updates: Partial<Timer> },
  { rejectValue: string }
>(
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

export const deleteTimersAsync = createAsyncThunk<
  string[],
  string[],
  { rejectValue: string }
>('timers/deleteTimers', async (ids: string[], { rejectWithValue }) => {
  try {
    await timerApi.deleteTimers(ids);
    return ids;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete timers';
    return rejectWithValue(message);
  }
});

export const deleteTimerAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('timers/deleteTimer', async (id: string, { rejectWithValue }) => {
  try {
    await timerApi.deleteTimers([id]);
    return id;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete timer';
    return rejectWithValue(message);
  }
});
