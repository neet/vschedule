import { FirestoreStore } from '@google-cloud/connect-firestore';
import { Firestore } from '@google-cloud/firestore';
import session, { Store } from 'express-session';

import { IConfigSession } from '../../modules/_shared';

const createStore = (storeType: IConfigSession['store']): Store | undefined => {
  if (storeType === 'firestore') {
    return new FirestoreStore({
      dataset: new Firestore(),
      kind: 'express-sessions',
    });
  }
};

export const createSession = (config: IConfigSession) => {
  return session({
    resave: true,
    saveUninitialized: false,
    cookie: {},
    secret: config.secret,
    store: createStore(config.store),
  });
};
