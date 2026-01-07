import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

type ConfirmModalState =
  | { isOpen: false }
  | {
      isOpen: true;
      title: string;
      message: string;
      kind: 'deleteOne';
      timerId: string;
    }
  | {
      isOpen: true;
      title: string;
      message: string;
      kind: 'deleteMany';
      timerIds: string[];
    };

interface UIState {
  confirmModal: ConfirmModalState;
  nowMs: number;
}

const initialState: UIState = {
  confirmModal: {
    isOpen: false,
  },
  nowMs: Date.now(),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openConfirmModal: (
      state,
      action: PayloadAction<Exclude<ConfirmModalState, { isOpen: false }>>
    ) => {
      state.confirmModal = action.payload;
    },
    closeConfirmModal: (state) => {
      state.confirmModal = { isOpen: false };
    },
    tickNow: (state) => {
      state.nowMs = Date.now();
    },
  },
});

export const { openConfirmModal, closeConfirmModal, tickNow } = uiSlice.actions;

export const selectUIState = (state: RootState) => state.ui;
export const selectConfirmModal = (state: RootState) => state.ui.confirmModal;
export const selectNowMs = (state: RootState) => state.ui.nowMs;
export const selectIsConfirmModalOpen = (state: RootState) =>
  state.ui.confirmModal.isOpen;

export default uiSlice.reducer;
