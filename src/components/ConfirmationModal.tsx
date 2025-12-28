import React, { useEffect, useRef } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDangerous?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDangerous = false,
}) => {
  const { colorTheme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const themeConfirmColors = {
    blue: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500',
    green:
      'bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-500',
    red: 'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-500',
  };

  // Focus trap and escape key handler
  useEffect(() => {
    if (!isOpen) return;

    // Focus the cancel button when modal opens
    cancelButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }

      // Trap focus within modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-strong max-w-md w-full mx-4 p-6 animate-slide-up"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex items-start gap-4">
          {isDangerous && (
            <div className="flex-shrink-0 mt-1" aria-hidden="true">
              <AlertCircle className="w-6 h-6 text-danger-500 dark:text-danger-400" />
            </div>
          )}
          <div className="flex-1">
            <h3
              id="modal-title"
              className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 pr-6"
            >
              {title}
            </h3>
            <p
              id="modal-description"
              className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
            >
              {message}
            </p>

            <div
              className="flex justify-end gap-3"
              role="group"
              aria-label="Dialog actions"
            >
              <button
                ref={cancelButtonRef}
                onClick={onCancel}
                className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 font-medium text-gray-900 dark:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label={cancelText}
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`px-5 py-2.5 rounded-lg text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDangerous
                    ? 'bg-danger-500 hover:bg-danger-600 active:bg-danger-700 focus:ring-danger-500'
                    : themeConfirmColors[colorTheme]
                }`}
                aria-label={confirmText}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
