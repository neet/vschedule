import { actionCreatorFactory } from 'typescript-fsa';
import { EventList } from 'shared/entities/event';

const actionCreator = actionCreatorFactory('Events');

export const fetchEvents = actionCreator<void>('FETCH');
export const fetchEventsProcess = actionCreator.async<void, EventList>('FETCH');
