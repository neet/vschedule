import { fetchEventsProcess } from '../actions/events';
import produce, { Draft } from 'immer';
import { isType } from 'typescript-fsa';
import { Liver } from '../../../../shared/entities/liver';

export interface LiversState {
  readonly [K: string]: Liver;
}

function normalizeLiver (state: Draft<LiversState>, liver: Liver) {
  state[liver.id] = liver;
}

function normalizeLivers (state: Draft<LiversState>, livers: Liver[]) {
  for (const liver of livers) {
    normalizeLiver(state, liver);
  }
}

const initialState: LiversState = {};

export const liversReducer = (state = initialState, action) => produce(state, (draft) => {
  if (isType(action, fetchEventsProcess.done)) {
    normalizeLivers(state, action.payload.result.map(event => event.liver));
  }

  return draft;
})
