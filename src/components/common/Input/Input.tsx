import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  required,
  disabled,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const baseStyles =
    'px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2';
  const stateStyles = error
    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  const disabledStyles = disabled ? 'bg-gray-100 cursor-not-allowed' : '';
  const widthStyle = fullWidth ? 'w-full' : '';
  const leftPadding = leftIcon ? 'pl-10' : '';
  const rightPadding = rightIcon ? 'pr-10' : '';

  let describedBy: string | undefined;
  if (error) {
    describedBy = errorId;
  } else if (helperText) {
    describedBy = helperId;
  } else {
    describedBy = undefined;
  }

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          className={`${baseStyles} ${stateStyles} ${disabledStyles} ${widthStyle} ${leftPadding} ${rightPadding} ${className}`}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={!!required}
          {...props}
        />

        {rightIcon && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
