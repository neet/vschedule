import { fetchEventsProcess } from 'client/ui/redux/actions/events';
import produce, { Draft } from 'immer';
import { isType } from 'typescript-fsa';
import { Event } from 'shared/entities/event';
import { Reducer } from 'client/ui/redux/types';
import { Overwrite } from 'type-zoo';

export type NormalizedEvent = Overwrite<
  Event,
  {
    liver: number;
  }
>;

export interface EventsState {
  readonly [K: number]: NormalizedEvent;
}

function normalizeEvent(state: Draft<EventsState>, event: Event) {
  state[event.id] = {
    ...event,
    liver: event.liver.id,
  };
}

function normalizeEvents(state: Draft<EventsState>, events: Event[]) {
  for (const event of events) {
    normalizeEvent(state, event);
  }
}

const initialState: EventsState = {};

export const eventsReducer: Reducer<EventsState> = (
  state = initialState,
  action,
) =>
  produce(state, draft => {
    if (isType(action, fetchEventsProcess.done)) {
      normalizeEvents(state, action.payload.result.events);
      return;
    }

    return draft;
  });
