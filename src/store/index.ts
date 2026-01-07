import { configureStore, type Middleware } from '@reduxjs/toolkit';
import timersReducer from './slices/timersSlice';
import filtersReducer from './slices/filtersSlice';
import selectionReducer from './slices/selectionSlice';
import uiReducer from './slices/uiSlice';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const timerActions = [
    'timers/startTimer',
    'timers/pauseTimer',
    'timers/resetTimer',
    'timers/startAllTimers',
    'timers/pauseAllTimers',
    'timers/resetAllTimers',
  ];

  if (timerActions.includes(action.type)) {
    const state = store.getState() as RootState;
    localStorage.setItem('timers', JSON.stringify(state.timers.items));
  }

  return result;
};

export const store = configureStore({
  reducer: {
    timers: timersReducer,
    filters: filtersReducer,
    selection: selectionReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
