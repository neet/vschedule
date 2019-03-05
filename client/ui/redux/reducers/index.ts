import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { liversReducer } from './livers';
import { eventListsReducer } from './event-lists';
import { RootState, RootAction } from '../types';

export const reducerMap = {
  events: eventsReducer,
  livers: liversReducer,
  eventLists: eventListsReducer,
}

export const reducers = combineReducers<RootState, RootAction>(reducerMap);
