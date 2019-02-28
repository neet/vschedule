import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { liversReducer } from './livers';
import { RootState, RootAction } from '../types';

export const reducerMap = {
  events: eventsReducer,
  livers: liversReducer,
}

export const reducers = combineReducers<RootState, RootAction>(reducerMap);
