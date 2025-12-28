# Timer & Productivity Dashboard

## Phase 1: Without Redux (Current Implementation)

A React + TypeScript timer management application demonstrating the limitations of local state management without Redux.

### 🎯 Goal

This project intentionally showcases scalability issues with complex state management using only React's built-in tools (`useState`, `useReducer`, Context) to justify the need for Redux in Phase 2.

### ✨ Features

- **Timer Management**: Create, edit, delete, start, pause, and reset timers
- **Bulk Operations**: Select multiple timers and perform bulk actions
- **Filtering & Search**: Filter by status, search by name, sort by various criteria
- **Real-time Stats**: Dashboard showing total timers, running count, paused count, total elapsed time, and longest running timer
- **Mock API**: Simulated async operations with localStorage persistence

### 🚫 Observed Problems (Phase 1)

The current implementation intentionally demonstrates these anti-patterns:

1. **State Explosion**: Multiple pieces of state (`timers`, `filters`, `selectedIds`, `apiState`, `confirmModal`) all managed in Dashboard component
2. **Prop Drilling Hell**: Props passed through 4-5 component levels (Dashboard → TimerList → TimerCard)
3. **Derived State Duplication**: Stats recalculated on every render across multiple components
4. **Inconsistent State Updates**: Selection state and timer state updated separately
5. **Difficult Testing**: Requires mocking deeply nested props, logic tightly coupled to UI
6. **Performance Issues**: No memoization, unnecessary re-renders

### 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### 📦 Installation

```bash
npm install
```

### 🚀 Development

```bash
npm run dev
```

### 🔜 Next Steps (Phase 2)

The follow-up PR will introduce **Redux Toolkit** to solve all the above problems by:

- Centralizing state management
- Eliminating prop drilling
- Creating memoized selectors for derived data
- Simplifying component logic
- Improving testability
- Adding RTK Query for async state management

### 📝 License

MIT
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
