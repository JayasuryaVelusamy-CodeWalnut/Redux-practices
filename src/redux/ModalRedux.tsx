import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeConfirmModal } from '../store/slices/uiSlice';
import { deleteTimer, deleteTimers } from '../store/slices/timersSlice';
import { removeFromSelection } from '../store/slices/selectionSlice';
import { AlertCircle, X } from 'lucide-react';

export const ModalRedux: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, title, message, onConfirmAction, actionPayload } =
    useAppSelector((state) => state.ui.confirmModal);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (
      onConfirmAction === 'timers/deleteTimer' &&
      typeof actionPayload === 'string'
    ) {
      dispatch(deleteTimer(actionPayload));
      dispatch(removeFromSelection([actionPayload]));
    } else if (
      onConfirmAction === 'timers/deleteTimers' &&
      Array.isArray(actionPayload)
    ) {
      dispatch(deleteTimers(actionPayload));
      dispatch(removeFromSelection(actionPayload));
    }

    dispatch(closeConfirmModal());
  };

  const handleCancel = () => {
    dispatch(closeConfirmModal());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black bg-opacity-50 cursor-default"
        onClick={handleCancel}
        onKeyDown={(event) => {
          if (event.key === 'Escape') handleCancel();
        }}
        aria-label="Close modal backdrop"
        tabIndex={-1}
      />

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0" aria-hidden="true">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h2 id="modal-title" className="text-lg font-semibold mb-2">
              {title}
            </h2>
            <p id="modal-description" className="text-gray-600 mb-6">
              {message}
            </p>

            <footer className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirm
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
