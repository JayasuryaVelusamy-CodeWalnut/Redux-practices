// Timer Types for Phase 1 (Without Redux)

export interface Timer {
  id: string;
  name: string;
  startTime: number | null;
  elapsed: number; // milliseconds
  status: 'idle' | 'running' | 'paused';
  createdAt: number;
}

export type TimerStatus = 'all' | 'running' | 'paused' | 'idle';

export type SortBy = 'createdAt' | 'elapsed' | 'name';

export interface FilterState {
  status: TimerStatus;
  searchQuery: string;
  sortBy: SortBy;
}

export interface SelectionState {
  selectedIds: Set<string>;
  isAllSelected: boolean;
}

export interface DashboardStats {
  totalTimers: number;
  runningCount: number;
  pausedCount: number;
  totalElapsed: number;
  longestRunningTimer: Timer | null;
}

export interface ApiState {
  isLoading: boolean;
  error: string | null;
}

// Action types for timer reducer
export type TimerAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: { id: string; updates: Partial<Timer> } }
  | { type: 'DELETE_TIMER'; payload: string }
  | { type: 'DELETE_TIMERS'; payload: string[] }
  | { type: 'START_TIMER'; payload: string }
  | { type: 'PAUSE_TIMER'; payload: string }
  | { type: 'RESET_TIMER'; payload: string }
  | { type: 'START_ALL' }
  | { type: 'PAUSE_ALL' }
  | { type: 'RESET_ALL' }
  | { type: 'SET_TIMERS'; payload: Timer[] };
