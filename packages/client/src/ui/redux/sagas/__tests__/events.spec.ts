import { call, put, all, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { fetchEventsWorker, eventsSaga } from 'client/ui/redux/sagas/events';
import {
  fetchEventsProcess,
  fetchEvents,
} from 'client/ui/redux/actions/events';
import { api } from 'client/ui/redux/api';
import { EventList } from 'shared/entities/event';

describe('events saga', () => {
  const eventSagaGen = cloneableGenerator(eventsSaga)();
  const fetchEventsWorkerGen = cloneableGenerator(fetchEventsWorker)();

  test('call all event sagas', () => {
    const clone = eventSagaGen.clone();
    expect(clone.next().value).toEqual(
      all([takeEvery(fetchEvents, fetchEventsWorker)]),
    );
  });

  test('fetch all events', () => {
    const clone = fetchEventsWorkerGen.clone();
    const events = {
      events: [{ id: 1 }, { id: 2 }],
    } as EventList;

    expect(clone.next().value).toEqual(put(fetchEventsProcess.started()));
    expect(clone.next().value).toEqual(call(api.fetchEvents));
    expect(clone.next(events).value).toEqual(
      put(fetchEventsProcess.done({ result: events })),
    );
    expect(clone.next().done).toBe(true);
  });
});
