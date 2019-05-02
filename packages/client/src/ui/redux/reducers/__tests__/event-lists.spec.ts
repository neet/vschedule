import { eventListsReducer } from 'client/ui/redux/reducers/event-lists';
import { fetchEventsProcess } from 'client/ui/redux/actions/events';
import { Event } from 'shared/entities/event';

describe('event lists reducer', () => {
  test('stores events', () => {
    const pseudoEvents = [{ id: 123 }, { id: 456 }, { id: 789 }] as Event[];

    const state = eventListsReducer(
      undefined,
      fetchEventsProcess.done({
        result: { events: pseudoEvents },
      }),
    );

    expect(state.all[0]).toBe(123);
    expect(state.all[1]).toBe(456);
    expect(state.all[2]).toBe(789);
  });

  test('do nothing if inrelevant action dispatched', () => {
    const state = eventListsReducer(undefined, fetchEventsProcess.started());
    expect(state.all).toEqual([]);
  });
});
