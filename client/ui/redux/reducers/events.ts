import { fetchEventsProcess } from '../actions/events';
import produce, { Draft } from 'immer';
import { isType } from 'typescript-fsa';
import { Event } from '../../../../shared/entities/event';

export interface EventsState {
  readonly [K: string]: Event;
}

function normalizeEvent (state: Draft<EventsState>, event: Event) {
  event = { ...event };

  delete event.liver;

  state[event.id] = event;
}

function normalizeEvents (state: Draft<EventsState>, events: Event[]) {
  for (const event of events)  {
    normalizeEvent(state, event);
  }
}

const initialState: EventsState = {};

export const eventsReducer = (state = initialState, action) => produce(state, (draft) => {
  if (isType(action, fetchEventsProcess.done)) {
    normalizeEvents(state, action.payload.result);
    return;
  }

  return draft;
})
