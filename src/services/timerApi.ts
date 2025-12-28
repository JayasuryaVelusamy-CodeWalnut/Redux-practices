// Mock API service to simulate async operations

import type { Timer } from '../types/timer';

const MOCK_DELAY = 800; // Simulate network delay

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate API responses
export const timerApi = {
  async fetchTimers(): Promise<Timer[]> {
    await delay(MOCK_DELAY);

    // Return mock data or empty array
    const stored = localStorage.getItem('timers');
    if (stored) {
      return JSON.parse(stored);
    }

    return [];
  },

  async updateTimer(id: string, updates: Partial<Timer>): Promise<Timer> {
    await delay(MOCK_DELAY);

    const stored = localStorage.getItem('timers');
    const timers: Timer[] = stored ? JSON.parse(stored) : [];

    const index = timers.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error('Timer not found');
    }

    timers[index] = { ...timers[index], ...updates };
    localStorage.setItem('timers', JSON.stringify(timers));

    return timers[index];
  },

  async bulkUpdateTimers(
    ids: string[],
    updates: Partial<Timer>
  ): Promise<Timer[]> {
    await delay(MOCK_DELAY);

    const stored = localStorage.getItem('timers');
    const timers: Timer[] = stored ? JSON.parse(stored) : [];

    const updatedTimers = timers.map((timer) => {
      if (ids.includes(timer.id)) {
        return { ...timer, ...updates };
      }
      return timer;
    });

    localStorage.setItem('timers', JSON.stringify(updatedTimers));

    return updatedTimers.filter((t) => ids.includes(t.id));
  },

  async createTimer(timer: Timer): Promise<Timer> {
    await delay(MOCK_DELAY);

    const stored = localStorage.getItem('timers');
    const timers: Timer[] = stored ? JSON.parse(stored) : [];

    timers.push(timer);
    localStorage.setItem('timers', JSON.stringify(timers));

    return timer;
  },

  async deleteTimers(ids: string[]): Promise<void> {
    await delay(MOCK_DELAY);

    const stored = localStorage.getItem('timers');
    const timers: Timer[] = stored ? JSON.parse(stored) : [];

    const filtered = timers.filter((t) => !ids.includes(t.id));
    localStorage.setItem('timers', JSON.stringify(filtered));
  },
};
