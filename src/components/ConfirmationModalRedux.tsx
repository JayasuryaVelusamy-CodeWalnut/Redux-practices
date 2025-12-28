import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeConfirmModal } from '../store/slices/uiSlice';
import { deleteTimer, deleteTimers } from '../store/slices/timersSlice';
import { removeFromSelection } from '../store/slices/selectionSlice';
import { AlertCircle, X } from 'lucide-react';

export const ConfirmationModalRedux: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, title, message, onConfirmAction, actionPayload } =
    useAppSelector((state) => state.ui.confirmModal);

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Dispatch the appropriate action based on the stored action type
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
