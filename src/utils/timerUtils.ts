import type { Timer, DashboardStats } from '../types/timer';

export const generateId = (): string => {
  return crypto.randomUUID();
};

export const createNewTimer = (name: string): Timer => {
  return {
    id: generateId(),
    name: name || 'Untitled Timer',
    startTime: null,
    elapsed: 0,
    status: 'idle',
    createdAt: Date.now(),
  };
};

export const calculateElapsed = (timer: Timer): number => {
  if (timer.status === 'running' && timer.startTime) {
    return timer.elapsed + (Date.now() - timer.startTime);
  }
  return timer.elapsed;
};

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const calculateDashboardStats = (timers: Timer[]): DashboardStats => {
  const runningTimers = timers.filter((timer) => timer.status === 'running');
  const pausedTimers = timers.filter((timer) => timer.status === 'paused');

  const totalElapsed = timers.reduce((sum, timer) => {
    return sum + calculateElapsed(timer);
  }, 0);

  const longestRunningTimer = runningTimers.reduce<Timer | null>(
    (longest, timer) => {
      if (!longest) return timer;
      return calculateElapsed(timer) > calculateElapsed(longest)
        ? timer
        : longest;
    },
    null
  );

  return {
    totalTimers: timers.length,
    runningCount: runningTimers.length,
    pausedCount: pausedTimers.length,
    totalElapsed,
    longestRunningTimer,
  };
};
