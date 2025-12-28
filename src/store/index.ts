import { configureStore } from '@reduxjs/toolkit';
import timersReducer from './slices/timersSlice';
import filtersReducer from './slices/filtersSlice';
import selectionReducer from './slices/selectionSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    timers: timersReducer,
    filters: filtersReducer,
    selection: selectionReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['ui/openConfirmModal'],
        ignoredPaths: ['ui.confirmModal.actionPayload'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
