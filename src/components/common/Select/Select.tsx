import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  placeholder,
  fullWidth = false,
  className = '',
  id,
  required,
  disabled,
  ...props
}) => {
  const generatedId = React.useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  const baseStyles =
    'px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 bg-white';
  const stateStyles = error
    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  const disabledStyles = disabled
    ? 'bg-gray-100 cursor-not-allowed'
    : 'cursor-pointer';
  const widthStyle = fullWidth ? 'w-full' : '';

  let ariaDescribedBy: string | undefined;
  if (error) {
    ariaDescribedBy = errorId;
  } else if (helperText) {
    ariaDescribedBy = helperId;
  }

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={selectId}
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

      <select
        id={selectId}
        className={`${baseStyles} ${stateStyles} ${disabledStyles} ${widthStyle} ${className}`}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy}
        aria-required={!!required}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

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
