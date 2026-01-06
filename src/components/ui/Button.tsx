import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      leadingIcon,
      trailingIcon,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const { colorTheme } = useTheme();

    const baseStyles =
      'flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles: Record<ButtonVariant, string> = {
      primary: (() => {
        switch (colorTheme) {
          case 'blue':
            return 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-sm';
          case 'green':
            return 'bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-sm';
          case 'red':
            return 'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 text-white shadow-sm';
        }
      })(),
      secondary:
        'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 dark:active:bg-gray-800 text-white shadow-sm',
      success:
        'bg-success-500 hover:bg-success-600 active:bg-success-700 focus:ring-success-500 dark:bg-success-600 dark:hover:bg-success-700 text-white shadow-sm',
      danger:
        'bg-danger-500 hover:bg-danger-600 active:bg-danger-700 focus:ring-danger-500 dark:bg-danger-600 dark:hover:bg-danger-700 dark:active:bg-danger-800 text-white shadow-sm',
      ghost: (() => {
        switch (colorTheme) {
          case 'blue':
            return 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:ring-blue-500 text-sm';
          case 'green':
            return 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 focus:ring-green-500 text-sm';
          case 'red':
            return 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:ring-red-500 text-sm';
        }
      })(),
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {leadingIcon && <span aria-hidden="true">{leadingIcon}</span>}
        <span>{children}</span>
        {trailingIcon && <span aria-hidden="true">{trailingIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
