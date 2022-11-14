import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { OrganizationQueryServicePrisma } from '../adapters/query-services/organization-query-service-prisma';
import { PerformerQueryServicePrisma } from '../adapters/query-services/performer-query-service-prisma';
import { StreamQueryServicePrisma } from '../adapters/query-services/stream-query-service-prisma';
import { MediaAttachmentRepositoryPrismaImpl } from '../adapters/repositories/media-attachment-repository-prisma';
import { OrganizationRepositoryPrisma } from '../adapters/repositories/organization-repository-prisma';
import { PerformerRepositoryPrisma } from '../adapters/repositories/performer-repository-prisma';
import { ResubscriptionTaskRepositoryCloudTasks } from '../adapters/repositories/resubscription-task-repository-cloud-tasks';
import { StreamRepositoryPrisma } from '../adapters/repositories/stream-repository-prisma';
import { TokenRepositoryPrisma } from '../adapters/repositories/token-repository-prisma';
import { UserRepositoryPrisma } from '../adapters/repositories/user-repository-prisma';
import {
  IAppConfig,
  ILogger,
  IOrganizationQueryService,
  IPerformerQueryService,
  IStorage,
  IStreamQueryService,
  IYoutubeApiService,
  IYoutubeWebsubService,
} from '../app';
import { OrganizationFactory } from '../app/organization/organization-factory-impl';
import { PerformerFactoryImpl } from '../app/performer/performer-factory-impl';
import { StreamFactoryImpl } from '../app/stream/stream-factory-impl';
import {
  IMediaAttachmentRepository,
  IOrganizationFactory,
  IOrganizationRepository,
  IPerformerFactory,
  IPerformerRepository,
  IResubscriptionTaskRepository,
  IStreamFactory,
  IStreamRepository,
  ITokenRepository,
  IUserRepository,
} from '../domain';
import { TYPES } from '../types';
import { Authenticate } from './middlewares/authenticate';
import { Authenticated } from './middlewares/authenticated';
import { AppConfigConsmiconfig } from './services/app-config-cosmiconfig';
import { loggerCloudLogging } from './services/logger-cloud-logging';
import { loggerConsole } from './services/logger-console';
import { StorageCloudStorage } from './services/storage-cloud-storage';
import { YoutubeApiService } from './services/youtube-api-service';
import { YoutubeWebsubParser } from './services/youtube-websub-parser';
import { YoutubeWebsubService } from './services/youtube-websub-service';

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
container.bind<IAppConfig>(TYPES.AppConfig).to(AppConfigConsmiconfig);

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
  .to(PerformerRepositoryPrisma);

container
  .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
  .to(OrganizationRepositoryPrisma);

container
  .bind<IStreamRepository>(TYPES.StreamRepository)
  .to(StreamRepositoryPrisma);

container
  .bind<IMediaAttachmentRepository>(TYPES.MediaAttachmentRepository)
  .to(MediaAttachmentRepositoryPrismaImpl);

container
  .bind<IResubscriptionTaskRepository>(TYPES.ResubscriptionTaskRepository)
  .to(ResubscriptionTaskRepositoryCloudTasks);

container
  .bind<ITokenRepository>(TYPES.TokenRepository)
  .to(TokenRepositoryPrisma);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepositoryPrisma);

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
  .to(PerformerQueryServicePrisma);

container.bind<IStreamFactory>(TYPES.StreamFactory).to(StreamFactoryImpl);

container
  .bind<IPerformerFactory>(TYPES.PerformerFactory)
  .to(PerformerFactoryImpl);

container
  .bind<IOrganizationFactory>(TYPES.OrganizationFactory)
  .to(OrganizationFactory);

container.bind(TYPES.YoutubeWebsubParser).to(YoutubeWebsubParser);

container.bind<IStorage>(TYPES.Storage).to(StorageCloudStorage);

container.bind(TYPES.Authenticate).to(Authenticate);
container.bind(TYPES.Authenticated).to(Authenticated);

export { container };
