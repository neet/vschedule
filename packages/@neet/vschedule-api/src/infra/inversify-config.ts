import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { ILogger, sharedContainer } from '../modules/_shared';
import { ConfigEnvironment } from '../modules/_shared/adapters/config-environment';
import { IConfig } from '../modules/_shared/app';
import { mediaAttachmentContainer } from '../modules/media-attachments';
import { organizationContainer } from '../modules/organizations';
import { performersContainer } from '../modules/performers';
import { resubscriptionTaskContainer } from '../modules/resubscription-tasks';
import { streamsContainer } from '../modules/streams';
import { tokensContainer } from '../modules/tokens';
import { usersContainer } from '../modules/users';
import { TYPES } from '../types';
import { Authenticate } from './middlewares/Authenticate';
import { Authenticated } from './middlewares/Authenticated';
import { YoutubeWebsubParser } from './middlewares/YoutubeWebsubParser';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});
container.bind<IConfig>(TYPES.Config).to(ConfigEnvironment);
const config = container.get<IConfig>(TYPES.Config);

container.load(sharedContainer(config));
container.load(mediaAttachmentContainer);
container.load(organizationContainer);
container.load(performersContainer);
container.load(resubscriptionTaskContainer);
container.load(streamsContainer);
container.load(tokensContainer);
container.load(usersContainer);

const prisma = new PrismaClient({
  log: [
    { level: 'info', emit: 'event' },
    { level: 'query', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);

{
  const logger = container.get<ILogger>(TYPES.Logger);
  prisma.$on('query', (e) => logger.debug(e.query, e.params, e.duration));
  prisma.$on('info', (e) => logger.info(e.message));
  prisma.$on('warn', (e) => logger.warning(e.message));
  prisma.$on('error', (e) => logger.error(e.message));
}

container.bind(TYPES.YoutubeWebsubParser).to(YoutubeWebsubParser);
container.bind(TYPES.Authenticate).to(Authenticate);
container.bind(TYPES.Authenticated).to(Authenticated);

export { container };
