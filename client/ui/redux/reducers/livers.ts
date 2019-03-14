import { fetchEventsProcess } from 'client/ui/redux/actions/events';
import produce, { Draft, Immutable } from 'immer';
import { isType } from 'typescript-fsa';
import { Liver } from 'shared/entities/liver';
import { Reducer } from 'client/ui/redux/types';

export interface LiversState {
  readonly [K: number]: Immutable<Liver>;
}

function normalizeLiver(draft: Draft<LiversState>, liver: Liver) {
  draft[liver.id] = liver;
}

function normalizeLivers(draft: Draft<LiversState>, livers: Liver[]) {
  for (const liver of livers) {
    normalizeLiver(draft, liver);
  }
}

const initialState: LiversState = {};

export const liversReducer: Reducer<LiversState> = (
  state = initialState,
  action,
) =>
  produce(state, draft => {
    if (isType(action, fetchEventsProcess.done)) {
      normalizeLivers(
        draft,
        action.payload.result.events.map(event => event.liver),
      );
    }

    return draft;
  });
