import { all, fork } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { sagas } from 'client/ui/redux/sagas';
import { eventsSaga } from '../events';

describe('root saga', () => {
  const rootSagaGen = cloneableGenerator(sagas)();

  test('forks all sagas', () => {
    const clone = rootSagaGen.clone();
    expect(clone.next().value).toEqual(all([fork(eventsSaga)]));
  });
});
