/**
 * This file should be able to run without Jest
 * because globalSetup - which cannot refer jest - depends on this.
 */
import { Container } from 'inversify';

import { IConfig } from '../src/app';
import { ConfigConsmiconfig } from '../src/infra/services/config-cosmiconfig';
import { ConfigEnvironment } from '../src/infra/services/config-environment';
import { TYPES } from '../src/types';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

container
  .bind<IConfig>(TYPES.Config)
  .to(ConfigConsmiconfig)
  .when(() => !process.env.CI);

container
  .bind<IConfig>(TYPES.Config)
  .to(ConfigEnvironment)
  .when(() => !!process.env.CI);

export { container };
