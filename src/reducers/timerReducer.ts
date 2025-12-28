import type { Timer, TimerAction } from '../types/timer';

export const timerReducer = (state: Timer[], action: TimerAction): Timer[] => {
  switch (action.type) {
    case 'ADD_TIMER':
      return [...state, action.payload];

    case 'UPDATE_TIMER': {
      return state.map((timer) =>
        timer.id === action.payload.id
          ? { ...timer, ...action.payload.updates }
          : timer
      );
    }

    case 'DELETE_TIMER':
      return state.filter((timer) => timer.id !== action.payload);

    case 'DELETE_TIMERS':
      return state.filter((timer) => !action.payload.includes(timer.id));

    case 'START_TIMER':
      return state.map((timer) =>
        timer.id === action.payload
          ? { ...timer, status: 'running' as const, startTime: Date.now() }
          : timer
      );

    case 'PAUSE_TIMER':
      return state.map((timer) => {
        if (timer.id === action.payload && timer.status === 'running') {
          const elapsed = timer.startTime
            ? timer.elapsed + (Date.now() - timer.startTime)
            : timer.elapsed;
          return {
            ...timer,
            status: 'paused' as const,
            elapsed,
            startTime: null,
          };
        }
        return timer;
      });

    case 'RESET_TIMER':
      return state.map((timer) =>
        timer.id === action.payload
          ? { ...timer, elapsed: 0, startTime: null, status: 'idle' as const }
          : timer
      );

    case 'START_ALL':
      return state.map((timer) =>
        timer.status !== 'running'
          ? { ...timer, status: 'running' as const, startTime: Date.now() }
          : timer
      );

    case 'PAUSE_ALL':
      return state.map((timer) => {
        if (timer.status === 'running') {
          const elapsed = timer.startTime
            ? timer.elapsed + (Date.now() - timer.startTime)
            : timer.elapsed;
          return {
            ...timer,
            status: 'paused' as const,
            elapsed,
            startTime: null,
          };
        }
        return timer;
      });

    case 'RESET_ALL':
      return state.map((timer) => ({
        ...timer,
        elapsed: 0,
        startTime: null,
        status: 'idle' as const,
      }));

    case 'SET_TIMERS':
      return action.payload;

    default:
      return state;
  }
};
