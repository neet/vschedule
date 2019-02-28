import { actionCreatorFactory } from 'typescript-fsa';
import { Event } from '../../../../shared/entities/event';

const actionCreator = actionCreatorFactory('Events');

export const fetchEvents = actionCreator<void>('FETCH');
export const fetchEventsProcess = actionCreator.async<void, Event[]>('FETCH');
