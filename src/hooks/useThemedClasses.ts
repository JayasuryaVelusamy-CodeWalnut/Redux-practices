import { useTheme } from '../contexts/ThemeContext';

export const useThemedClasses = () => {
  const { colorTheme } = useTheme();

  const getButtonClass = (
    variant: 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
  ) => {
    const baseClasses =
      'px-5 py-2.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm';

    const variants = {
      primary: {
        blue: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white focus:ring-blue-500',
        green:
          'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white focus:ring-green-500',
        red: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-500',
      },
      success: {
        blue: 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white focus:ring-green-500',
        green:
          'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white focus:ring-emerald-500',
        red: 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white focus:ring-green-500',
      },
      warning: {
        blue: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white focus:ring-yellow-500',
        green:
          'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white focus:ring-amber-500',
        red: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white focus:ring-orange-500',
      },
      danger: {
        blue: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-500',
        green:
          'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-500',
        red: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white focus:ring-rose-600',
      },
      secondary: {
        blue: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white focus:ring-gray-500',
        green:
          'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white focus:ring-gray-500',
        red: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white focus:ring-gray-500',
      },
    };

    return `${baseClasses} ${variants[variant][colorTheme]}`;
  };

  const getAccentClass = () => {
    const accents = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      red: 'text-red-600 dark:text-red-400',
    };
    return accents[colorTheme];
  };

  const getBgAccentClass = () => {
    const accents = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800',
      green:
        'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800',
      red: 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800',
    };
    return accents[colorTheme];
  };

  return {
    getButtonClass,
    getAccentClass,
    getBgAccentClass,
    colorTheme,
  };
};
