import { Router } from 'express';

import {
  IConfig,
  ILogger,
  IStorage,
  RestPresenter,
  YoutubeApiService,
  YoutubeWebsubService,
} from '../../modules/_shared';
import {
  IMediaAttachmentRepository,
  ShowMediaAttachment,
} from '../../modules/media-attachments';
import {
  CreateOrganization,
  IOrganizationQueryService,
  IOrganizationRepository,
  ListOrganization,
  ShowOrganization,
} from '../../modules/organizations';
import {
  CreatePerformer,
  IPerformerQueryService,
  IPerformerRepository,
  ListPerformers,
  ShowPerformer,
  SubscribeToPerformer,
  UpdatePerformer,
} from '../../modules/performers';
import {
  CreateResubscriptionTask,
  IResubscriptionTaskRepository,
} from '../../modules/resubscription-tasks';
import {
  CreateStream,
  IStreamQueryService,
  IStreamRepository,
  ListStreams,
  RemoveStream,
  ShowStream,
} from '../../modules/streams';
import { ITokenRepository } from '../../modules/tokens';
import { CreateUser, IUserRepository } from '../../modules/users';
import { AuthController } from '../controllers/auth';
import { MediaAttachmentController } from '../controllers/rest/v1/media';
import { OrganizationsRestController } from '../controllers/rest/v1/organizations';
import { PerformersController } from '../controllers/rest/v1/performers';
import { StreamsController } from '../controllers/rest/v1/streams';
import { YoutubeWebsubController } from '../controllers/websub/youtube';

interface Context {
  readonly config: IConfig;
  readonly logger: ILogger;
  readonly storage: IStorage;

  readonly organizationRepository: IOrganizationRepository;
  readonly performerRepository: IPerformerRepository;
  readonly mediaAttachmentRepository: IMediaAttachmentRepository;
  readonly streamRepository: IStreamRepository;
  readonly tokenRepository: ITokenRepository;
  readonly resubscriptionTaskRepository: IResubscriptionTaskRepository;
  readonly userRepository: IUserRepository;

  readonly organizationQueryService: IOrganizationQueryService;
  readonly streamQueryService: IStreamQueryService;
  readonly performerQueryService: IPerformerQueryService;
}

export const createController = (ctx: Context): Router => {
  const router = Router();
  const { config, logger } = ctx;

  const youtubeApiService = new YoutubeApiService(
    config.youtube.dataApiKey ?? '',
    logger,
  );
  const youtubeWebsubService = new YoutubeWebsubService(config);
  const restPresenter = new RestPresenter(config.server.origin);

  const organizationController = new OrganizationsRestController(
    new ShowOrganization(ctx.organizationRepository),
    new CreateOrganization(
      ctx.organizationRepository,
      ctx.mediaAttachmentRepository,
      youtubeApiService,
      logger,
    ),
    new ListOrganization(ctx.organizationQueryService),
    restPresenter,
  );

  const mediaController = new MediaAttachmentController(
    new ShowMediaAttachment(ctx.mediaAttachmentRepository),
  );

  const performersController = new PerformersController(
    new ShowPerformer(ctx.performerQueryService),
    new UpdatePerformer(
      ctx.performerRepository,
      ctx.performerQueryService,
      ctx.organizationRepository,
      logger,
    ),
    new CreatePerformer(
      ctx.performerRepository,
      ctx.performerQueryService,
      ctx.mediaAttachmentRepository,
      youtubeApiService,
      ctx.organizationRepository,
      logger,
    ),
    new ListPerformers(ctx.performerQueryService),
    new SubscribeToPerformer(ctx.performerRepository, youtubeWebsubService),
    restPresenter,
  );

  const streamsController = new StreamsController(
    new ListStreams(ctx.streamQueryService),
    new ShowStream(ctx.streamQueryService),
    restPresenter,
  );

  const youtubeWebsubController = new YoutubeWebsubController(
    new CreateStream(
      ctx.streamRepository,
      ctx.performerRepository,
      ctx.mediaAttachmentRepository,
      youtubeApiService,
      logger,
    ),
    new RemoveStream(ctx.streamRepository, logger),
    new CreateResubscriptionTask(
      ctx.tokenRepository,
      ctx.performerRepository,
      ctx.resubscriptionTaskRepository,
      logger,
      config,
    ),
  );

  const authController = new AuthController(
    new CreateUser(ctx.userRepository, logger, config),
    restPresenter,
  );

  router.use(organizationController.register());
  router.use(mediaController.register());
  router.use(performersController.register());
  router.use(streamsController.register());
  router.use(youtubeWebsubController.register());
  router.use(authController.register());

  return router;
};
