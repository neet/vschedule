import { reducerMap } from '..';

describe('root reducer', () => {
  test('initialize store correctly', () => {
    const store = reducerMap;

    expect(store).toEqual(
      expect.objectContaining({
        events: expect.any(Function),
        livers: expect.any(Function),
        eventLists: expect.any(Function),
      }),
    );
  });
});
