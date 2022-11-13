import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { OrganizationQueryServicePrisma } from '../adapters/query-services/OrganizationQueryServicePrisma';
import { PerformerQueryService } from '../adapters/query-services/PerformerQueryService';
import { StreamQueryServicePrisma } from '../adapters/query-services/StreamQueryServicePrisma';
import { MediaAttachmentRepositoryPrismaImpl } from '../adapters/repositories/MediaAttachmentRepository';
import { OrganizationRepository } from '../adapters/repositories/OrganizationRepository';
import { PerformerRepository } from '../adapters/repositories/PerformerRepository';
import { ResubscriptionTaskRepository } from '../adapters/repositories/ResubscriptionTaskRepository';
import { StreamRepository } from '../adapters/repositories/StreamRepository';
import { TokenRepository } from '../adapters/repositories/TokenRepository';
import { UserRepository } from '../adapters/repositories/UserRepository';
import {
  IOrganizationQueryService,
  IPerformerQueryService,
  IStreamQueryService,
} from '../app/query-services';
import { IAppConfig } from '../app/services/AppConfig/AppConfig';
import { ILogger } from '../app/services/Logger';
import { IStorage } from '../app/services/Storage';
import { IYoutubeApiService } from '../app/services/YoutubeApiService';
import { IYoutubeWebsubService } from '../app/services/YoutubeWebsubService';
import { IMediaAttachmentRepository } from '../domain/repositories/MediaAttachmentRepository';
import { IOrganizationRepository } from '../domain/repositories/OrganizationRepository';
import { IPerformerRepository } from '../domain/repositories/PerformerRepository';
import { IResubscriptionTaskRepository } from '../domain/repositories/ResubscriptionTaskRepository';
import { IStreamRepository } from '../domain/repositories/StreamRepository';
import { ITokenRepository } from '../domain/repositories/TokenRepository';
import { IUserRepository } from '../domain/repositories/UserRepository';
import { TYPES } from '../types';
import { Authenticate } from './middlewares/Authenticate';
import { Authenticated } from './middlewares/Authenticated';
import { AppConfigEnvironment } from './services/AppConfigEnvironment';
import { loggerCloudLogging } from './services/LoggerCloudLogging';
import { loggerConsole } from './services/LoggerConsole';
import { Storage } from './services/Storage';
import { YoutubeApiService } from './services/YouTubeApiService';
import { YoutubeWebsubParser } from './services/YoutubeWebsubParser';
import { YoutubeWebsubService } from './services/YoutubeWebsubService';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

const prisma = new PrismaClient({
  log: [
    { level: 'info', emit: 'event' },
    { level: 'query', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);
container.bind<IAppConfig>(TYPES.AppConfig).to(AppConfigEnvironment);

const config = container.get<IAppConfig>(TYPES.AppConfig);

container
  .bind<ILogger>(TYPES.Logger)
  .toConstantValue(loggerConsole)
  .when(() => config.logger.type === 'console');

container
  .bind<ILogger>(TYPES.Logger)
  .toConstantValue(loggerCloudLogging)
  .when(() => config.logger.type === 'cloud-logging');

const logger = container.get<ILogger>(TYPES.Logger);

prisma.$on('query', (e) => logger.debug(e.query, e.params, e.duration));
prisma.$on('info', (e) => logger.info(e.message));
prisma.$on('warn', (e) => logger.warning(e.message));
prisma.$on('error', (e) => logger.error(e.message));

container
  .bind<IPerformerRepository>(TYPES.PerformerRepository)
  .to(PerformerRepository);

container
  .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
  .to(OrganizationRepository);

container.bind<IStreamRepository>(TYPES.StreamRepository).to(StreamRepository);

container
  .bind<IMediaAttachmentRepository>(TYPES.MediaAttachmentRepository)
  .to(MediaAttachmentRepositoryPrismaImpl);

container
  .bind<IResubscriptionTaskRepository>(TYPES.ResubscriptionTaskRepository)
  .to(ResubscriptionTaskRepository);

container.bind<ITokenRepository>(TYPES.TokenRepository).to(TokenRepository);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

container
  .bind<IYoutubeApiService>(TYPES.YoutubeApiService)
  .to(YoutubeApiService);

container
  .bind<IYoutubeWebsubService>(TYPES.YoutubeWebsubService)
  .to(YoutubeWebsubService);

container
  .bind<IOrganizationQueryService>(TYPES.OrganizationQueryService)
  .to(OrganizationQueryServicePrisma);

container
  .bind<IStreamQueryService>(TYPES.StreamQueryService)
  .to(StreamQueryServicePrisma);

container
  .bind<IPerformerQueryService>(TYPES.PerformerQueryService)
  .to(PerformerQueryService);

container.bind(TYPES.YoutubeWebsubParser).to(YoutubeWebsubParser);

container.bind<IStorage>(TYPES.Storage).to(Storage);

container.bind(TYPES.Authenticate).to(Authenticate);
container.bind(TYPES.Authenticated).to(Authenticated);

export { container };
