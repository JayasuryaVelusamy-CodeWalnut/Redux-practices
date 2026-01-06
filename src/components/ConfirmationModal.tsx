import React, { useEffect, useRef } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Button } from './ui';

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
  const modalRef = useRef<HTMLDivElement>(null);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    // Focus the modal container to allow screen reader to announce title and description
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
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
        tabIndex={-1}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <header className="flex items-start gap-4">
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
          </div>
        </header>

        <footer className="flex justify-end gap-3">
          <Button
            onClick={onCancel}
            variant="secondary"
            className="border-2 border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 text-gray-900 dark:text-gray-100"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={isDangerous ? 'danger' : 'primary'}
          >
            {confirmText}
          </Button>
        </footer>
      </div>
    </div>
  );
};
