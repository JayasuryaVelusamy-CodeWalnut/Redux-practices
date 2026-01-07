import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeConfirmModal } from '../store/slices/uiSlice';
import {
  deleteTimerAsync,
  deleteTimersAsync,
} from '../store/thunks/timerThunks';
import { removeFromSelection } from '../store/slices/selectionSlice';
import { AlertCircle, X } from 'lucide-react';

export const ModalRedux: React.FC = () => {
  const dispatch = useAppDispatch();
  const confirmModal = useAppSelector((state) => state.ui.confirmModal);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closeConfirmModal());
      }
    };

    if (confirmModal.isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [confirmModal.isOpen, dispatch]);

  if (!confirmModal.isOpen) return null;

  const handleConfirm = () => {
    // Exhaustive type-safe handling based on discriminated union
    switch (confirmModal.kind) {
      case 'deleteOne':
        dispatch(deleteTimerAsync(confirmModal.timerId));
        dispatch(removeFromSelection([confirmModal.timerId]));
        break;
      case 'deleteMany':
        dispatch(deleteTimersAsync(confirmModal.timerIds));
        dispatch(removeFromSelection(confirmModal.timerIds));
        break;
      default: {
        // Exhaustiveness check - will error if we miss a case
        const _exhaustive: never = confirmModal;
        return _exhaustive;
      }
    }

    dispatch(closeConfirmModal());
  };

  const handleCancel = () => {
    dispatch(closeConfirmModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 bg-black bg-opacity-60 cursor-default transition-opacity duration-300"
        onClick={handleCancel}
        aria-label="Close modal backdrop"
        tabIndex={-1}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-[scale-in_0.2s_ease-out] border-2 border-blue-100"
      >
        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          aria-label="Close dialog"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-start gap-5">
          <div
            className="flex-shrink-0 bg-red-100 p-3 rounded-xl"
            aria-hidden="true"
          >
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <div className="flex-1">
            <h2
              id="modal-title"
              className="text-2xl font-bold mb-3 text-gray-900"
            >
              {confirmModal.title}
            </h2>
            <p
              id="modal-description"
              className="text-gray-600 mb-8 text-base leading-relaxed"
            >
              {confirmModal.message}
            </p>

            <footer className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold transition-all duration-200"
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
