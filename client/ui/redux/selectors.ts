import { RootState } from './types';
import { Event } from 'shared/entities/event';

export const eventSelector = (state: RootState, id: number): Event => ({
  ...state.events[id],
  liver: state.livers[state.events[id].liver],
});
