import { configureStore } from '../store';

describe('redux store', () => {
  test('configures redux store', () => {
    const store = configureStore();
    expect(store.getState).toBeTruthy();
  });
});
