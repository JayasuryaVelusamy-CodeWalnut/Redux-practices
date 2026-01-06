import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectFilteredAndSortedTimers } from '../store/selectors';
import { CardRedux } from './CardRedux';

export const TimerListRedux: React.FC = () => {
  const timers = useAppSelector(selectFilteredAndSortedTimers);

  if (timers.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No timers found</p>
        <p className="text-sm mt-2">
          Create a new timer to get started or adjust your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {timers.map((timer) => (
        <CardRedux key={timer.id} timerId={timer.id} />
      ))}
    </div>
  );
};
