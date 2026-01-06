import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirmAction: string | null; // Action type to dispatch on confirm
  actionPayload?: unknown;
}

interface UIState {
  confirmModal: ConfirmModalState;
}

const initialState: UIState = {
  confirmModal: {
    isOpen: false,
    title: '',
    message: '',
    onConfirmAction: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openConfirmModal: (
      state,
      action: PayloadAction<Omit<ConfirmModalState, 'isOpen'>>
    ) => {
      state.confirmModal = {
        ...action.payload,
        isOpen: true,
      };
    },
    closeConfirmModal: (state) => {
      state.confirmModal = initialState.confirmModal;
    },
  },
});

export const { openConfirmModal, closeConfirmModal } = uiSlice.actions;

export const selectUIState = (state: { ui: UIState }) => state.ui;
export const selectConfirmModal = (state: { ui: UIState }) =>
  state.ui.confirmModal;
export const selectIsConfirmModalOpen = (state: { ui: UIState }) =>
  state.ui.confirmModal.isOpen;

export default uiSlice.reducer;
