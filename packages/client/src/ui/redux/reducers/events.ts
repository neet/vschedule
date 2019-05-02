import { fetchEventsProcess } from 'client/ui/redux/actions/events';
import produce, { Draft, Immutable } from 'immer';
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
  readonly [K: number]: Immutable<NormalizedEvent>;
}

function normalizeEvent(draft: Draft<EventsState>, event: Event) {
  draft[event.id] = {
    ...event,
    liver: event.liver.id,
  };
}

function normalizeEvents(draft: Draft<EventsState>, events: Event[]) {
  for (const event of events) {
    normalizeEvent(draft, event);
  }
}

const initialState: EventsState = {};

export const eventsReducer: Reducer<EventsState> = (
  state = initialState,
  action,
) =>
  produce(state, draft => {
    if (isType(action, fetchEventsProcess.done)) {
      normalizeEvents(draft, action.payload.result.events);
      return;
    }

    return draft;
  });
