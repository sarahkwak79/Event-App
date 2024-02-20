import { TEvent } from '../types/types';

export const sortEvents = (events: TEvent[]): TEvent[] => {
  return events.sort((a, b) => a.start_time - b.start_time);
};
