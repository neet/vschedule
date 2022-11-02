import 'reflect-metadata';

import { IAppConfig } from '../app/services/AppConfig/AppConfig';
import { TYPES } from '../types';
import { app } from './app';
import { container } from './inversify-config';

const config = container.get<IAppConfig>(TYPES.AppConfig);

app.listen(config.entries.server.port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `server is ready at http://localhost:${config.entries.server.port}/api-docs`,
  );
});
