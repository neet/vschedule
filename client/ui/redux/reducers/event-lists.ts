import { Reducer } from '../types';
import produce from 'immer';
import { isType } from 'typescript-fsa';
import { fetchEventsProcess } from '../actions/events';

export interface EventListsState {
  readonly all: number[];
}

const initialState: EventListsState = {
  all: [],
};

export const eventListsReducer: Reducer<EventListsState> = (state = initialState, action) => produce(state, (draft) => {
  if (isType(action, fetchEventsProcess.done)) {
    draft.all = action.payload.result.events.map(event => event.id);
    return;
  }

  return draft;
})
