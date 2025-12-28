export type ColorTheme = 'blue' | 'green' | 'red';
export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  colorTheme: ColorTheme;
  mode: ThemeMode;
}

export const themeColors = {
  blue: {
    light: {
      primary: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
      primaryText: 'text-blue-600',
      primaryBg: 'bg-blue-50',
      primaryBorder: 'border-blue-300',
      ring: 'focus:ring-blue-500',
    },
    dark: {
      primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
      primaryText: 'text-blue-400',
      primaryBg: 'bg-blue-900/30',
      primaryBorder: 'border-blue-700',
      ring: 'focus:ring-blue-400',
    },
  },
  green: {
    light: {
      primary: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
      primaryText: 'text-green-600',
      primaryBg: 'bg-green-50',
      primaryBorder: 'border-green-300',
      ring: 'focus:ring-green-500',
    },
    dark: {
      primary: 'bg-green-600 hover:bg-green-700 active:bg-green-800',
      primaryText: 'text-green-400',
      primaryBg: 'bg-green-900/30',
      primaryBorder: 'border-green-700',
      ring: 'focus:ring-green-400',
    },
  },
  red: {
    light: {
      primary: 'bg-red-500 hover:bg-red-600 active:bg-red-700',
      primaryText: 'text-red-600',
      primaryBg: 'bg-red-50',
      primaryBorder: 'border-red-300',
      ring: 'focus:ring-red-500',
    },
    dark: {
      primary: 'bg-red-600 hover:bg-red-700 active:bg-red-800',
      primaryText: 'text-red-400',
      primaryBg: 'bg-red-900/30',
      primaryBorder: 'border-red-700',
      ring: 'focus:ring-red-400',
    },
  },
};
