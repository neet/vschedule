import { FirestoreStore } from '@google-cloud/connect-firestore';
import { Firestore } from '@google-cloud/firestore';
import { RequestHandler } from 'express';
import session from 'express-session';

import { IConfig } from '../app';

export const createSession = (config: IConfig['session']): RequestHandler => {
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
