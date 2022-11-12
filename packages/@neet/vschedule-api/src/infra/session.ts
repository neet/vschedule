import { FirestoreStore } from '@google-cloud/connect-firestore';
import { Firestore } from '@google-cloud/firestore';
import session from 'express-session';

import { IAppSession } from '../app/services/AppConfig/AppConfig';

export const createSession = (config: IAppSession) => {
  const store =
    config.store === 'firestore'
      ? new FirestoreStore({
          dataset: new Firestore(),
          kind: 'express-sessions',
        })
      : undefined;

  return session({
    resave: true,
    saveUninitialized: false,
    cookie: {},
    secret: config.secret,
    store,
  });
};
