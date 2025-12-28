import { createAsyncThunk } from '@reduxjs/toolkit';
import { timerApi } from '../../services/timerApi';
import type { Timer } from '../../types/timer';
import { setTimers, setLoading, setError } from '../slices/timersSlice';

export const fetchTimers = createAsyncThunk(
  'timers/fetchTimers',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const timers = await timerApi.fetchTimers();
      dispatch(setTimers(timers));
      return timers;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch timers';
      dispatch(setError(message));
      throw error;
    }
  }
);

export const createTimerAsync = createAsyncThunk(
  'timers/createTimer',
  async (timer: Timer, { dispatch }) => {
    try {
      const created = await timerApi.createTimer(timer);
      return created;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to create timer';
      dispatch(setError(message));
      throw error;
    }
  }
);

export const updateTimerAsync = createAsyncThunk(
  'timers/updateTimer',
  async (
    { id, updates }: { id: string; updates: Partial<Timer> },
    { dispatch }
  ) => {
    try {
      const updated = await timerApi.updateTimer(id, updates);
      return updated;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update timer';
      dispatch(setError(message));
      throw error;
    }
  }
);

export const bulkUpdateTimersAsync = createAsyncThunk(
  'timers/bulkUpdate',
  async (
    { ids, updates }: { ids: string[]; updates: Partial<Timer> },
    { dispatch }
  ) => {
    try {
      const updated = await timerApi.bulkUpdateTimers(ids, updates);
      return updated;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to bulk update timers';
      dispatch(setError(message));
      throw error;
    }
  }
);

export const deleteTimersAsync = createAsyncThunk(
  'timers/deleteTimers',
  async (ids: string[], { dispatch }) => {
    try {
      await timerApi.deleteTimers(ids);
      return ids;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to delete timers';
      dispatch(setError(message));
      throw error;
    }
  }
);
