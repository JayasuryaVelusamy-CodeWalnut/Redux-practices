import React from 'react';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  helperText,
  error,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;
  const helperId = `${checkboxId}-helper`;
  const errorId = `${checkboxId}-error`;

  let describedBy: string | undefined = undefined;
  if (error) {
    describedBy = errorId;
  } else if (helperText) {
    describedBy = helperId;
  }

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          type="checkbox"
          className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          disabled={disabled}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          {...props}
        />
      </div>

      {label && (
        <div className="ml-3">
          <label
            htmlFor={checkboxId}
            className={`text-sm font-medium ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer'}`}
          >
            {label}
          </label>

          {helperText && !error && (
            <p id={helperId} className="text-xs text-gray-500 mt-1">
              {helperText}
            </p>
          )}

          {error && (
            <p id={errorId} className="text-xs text-red-600 mt-1" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
