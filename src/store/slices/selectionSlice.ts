import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectionState {
  selectedIds: string[];
}

const initialState: SelectionState = {
  selectedIds: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);

      if (index === -1) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds.splice(index, 1);
      }
    },
    selectAll: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },
    deselectAll: (state) => {
      state.selectedIds = [];
    },
    removeFromSelection: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = state.selectedIds.filter(
        (id) => !action.payload.includes(id)
      );
    },
  },
});

export const { toggleSelection, selectAll, deselectAll, removeFromSelection } =
  selectionSlice.actions;

export const selectSelectionState = (state: { selection: SelectionState }) =>
  state.selection;
export const selectSelectedIds = (state: { selection: SelectionState }) =>
  state.selection.selectedIds;
export const selectSelectedCount = (state: { selection: SelectionState }) =>
  state.selection.selectedIds.length;

export default selectionSlice.reducer;
