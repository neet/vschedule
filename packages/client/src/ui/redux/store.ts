import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { RootAction, RootState } from './types';
import { reducers } from './reducers';
import { sagas } from './sagas';

export function configureStore() {
  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      window &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore<RootState, RootAction, void, void>(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(sagas);

  return store;
}
