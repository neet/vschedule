/* eslint-disable react-hooks/rules-of-hooks */
import 'reflect-metadata';

import { useContainer } from 'routing-controllers';

import { IConfig, ILogger } from '../app';
import { TYPES } from '../types';
import { App } from './app';
import { InversifyAdapter } from './inversify-adapter';
import { container } from './inversify-config';

const logger = container.get<ILogger>(TYPES.Logger);
const config = container.get<IConfig>(TYPES.Config);
const inversifyAdapter = new InversifyAdapter(container);
useContainer(inversifyAdapter);
const express = container.resolve(App);

express.configure().listen(config.server.port, () => {
  logger.info(
    `server is ready at http://localhost:${config.server.port}/docs`,
    { config },
  );
});
