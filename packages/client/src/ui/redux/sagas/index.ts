import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { eventsSaga } from './events';

export function* sagas(): SagaIterator {
  yield all([fork(eventsSaga)]);
}
