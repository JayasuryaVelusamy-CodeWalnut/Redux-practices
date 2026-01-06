import React, { useState } from 'react';
import { Sun, Moon, Palette, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { ColorTheme } from '../types/theme';

export const ThemeSwitcher: React.FC = () => {
  const { colorTheme, mode, setColorTheme, toggleMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colorThemes: {
    value: ColorTheme;
    label: string;
    color: string;
    darkColor: string;
  }[] = [
    {
      value: 'blue',
      label: 'Blue',
      color: 'bg-blue-500',
      darkColor: 'bg-blue-600',
    },
    {
      value: 'green',
      label: 'Green',
      color: 'bg-green-500',
      darkColor: 'bg-green-600',
    },
    {
      value: 'red',
      label: 'Red',
      color: 'bg-red-500',
      darkColor: 'bg-red-600',
    },
  ];

  const themeButtonColors = {
    blue: 'hover:border-blue-300 dark:hover:border-blue-600 focus:ring-blue-500',
    green:
      'hover:border-green-300 dark:hover:border-green-600 focus:ring-green-500',
    red: 'hover:border-red-300 dark:hover:border-red-600 focus:ring-red-500',
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${themeButtonColors[colorTheme]}`}
        aria-label="Open theme settings"
        aria-expanded={isOpen}
      >
        <Palette
          className="w-5 h-5 text-gray-700 dark:text-gray-300"
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
          Theme
        </span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className="absolute top-14 right-0 w-80 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-5 animate-slide-up"
            role="dialog"
            aria-label="Theme settings"
          >
            {/* Header */}
            <header className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Palette
                  className="w-5 h-5 text-gray-700 dark:text-gray-300"
                  aria-hidden="true"
                />
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Customize Theme
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 ${themeButtonColors[colorTheme]}`}
                aria-label="Close theme settings"
              >
                <X
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </header>

            {/* Dark Mode Toggle */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                Appearance
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    if (mode !== 'light') toggleMode();
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${themeButtonColors[colorTheme]} ${
                    mode === 'light'
                      ? 'border-gray-800 dark:border-gray-300 bg-gray-100 dark:bg-gray-700 shadow-md'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-750'
                  }`}
                  aria-pressed={mode === 'light'}
                  aria-label="Light mode"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Light
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (mode !== 'dark') toggleMode();
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${themeButtonColors[colorTheme]} ${
                    mode === 'dark'
                      ? 'border-gray-800 dark:border-gray-300 bg-gray-100 dark:bg-gray-700 shadow-md'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-750'
                  }`}
                  aria-pressed={mode === 'dark'}
                  aria-label="Dark mode"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Dark
                  </span>
                </button>
              </div>
            </div>

            {/* Color Theme Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                Color Accent
              </label>
              <div
                className="grid grid-cols-3 gap-3"
                role="radiogroup"
                aria-label="Color theme selection"
              >
                {colorThemes.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => setColorTheme(theme.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      colorTheme === theme.value
                        ? 'border-gray-800 dark:border-gray-300 bg-gray-100 dark:bg-gray-700 shadow-md scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-750 hover:scale-105'
                    }`}
                    role="radio"
                    aria-checked={colorTheme === theme.value}
                    aria-label={`${theme.label} theme`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${mode === 'dark' ? theme.darkColor : theme.color} ring-4 ring-white dark:ring-gray-800 shadow-md`}
                    />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {theme.label}
                    </span>
                    {colorTheme === theme.value && (
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-gray-800 dark:bg-gray-300"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Your preferences are saved automatically
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
