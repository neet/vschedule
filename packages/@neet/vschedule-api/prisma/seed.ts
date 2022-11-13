import 'reflect-metadata';

import {
  hololive as hololivePerformers,
  HOLOLIVE_YOUTUBE_CHANNEL_ID,
  nijisanji as nijisanjiPerformers,
  NIJISANJI_YOUTUBE_CHANNEL_ID,
  organizations,
} from '@neet/vschedule-seeds';
import { PrismaClient } from '@prisma/client';

import { createLogger, createStorage } from '../src/infra/factories';
import { createQueryServices } from '../src/infra/factories/query-services';
import { createRepositories } from '../src/infra/factories/repositories';
import {
  ConfigEnvironment,
  YoutubeApiService,
  YoutubeChannelId,
} from '../src/modules/_shared';
import { CreateOrganization } from '../src/modules/organizations';
import { CreatePerformer } from '../src/modules/performers';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  const config = new ConfigEnvironment();
  const logger = createLogger(config.logger);
  const repositories = createRepositories({
    prisma,
    config,
    storage: createStorage(config.storage),
    logger,
  });
  const queryServices = createQueryServices(prisma);
  const {
    organizationRepository,
    mediaAttachmentRepository,
    performerRepository,
  } = repositories;
  const youtubeApiService = new YoutubeApiService(
    config.youtube.dataApiKey ?? '',
    logger,
  );
  const createOrganization = new CreateOrganization(
    organizationRepository,
    mediaAttachmentRepository,
    youtubeApiService,
    logger,
  );
  const createPerformer = new CreatePerformer(
    performerRepository,
    queryServices.performerQueryService,
    mediaAttachmentRepository,
    youtubeApiService,
    organizationRepository,
    logger,
  );

  for (const organization of organizations) {
    if (organization.youtubeChannelId == null) {
      continue;
    }

    const record = await organizationRepository.findByYoutubeChannelId(
      new YoutubeChannelId(organization.youtubeChannelId),
    );
    if (record != null) {
      continue;
    }

    await createOrganization.invoke({
      name: organization.name,
      color: organization.color,
      youtubeChannelId: organization.youtubeChannelId,
      url: organization.url ?? null,
      description: organization.description ?? null,
      twitterUsername: organization.twitterUsername ?? null,
    });
  }

  const nijisanji = await organizationRepository.findByYoutubeChannelId(
    new YoutubeChannelId(NIJISANJI_YOUTUBE_CHANNEL_ID),
  );
  if (nijisanji == null) throw new Error();

  const hololive = await organizationRepository.findByYoutubeChannelId(
    new YoutubeChannelId(HOLOLIVE_YOUTUBE_CHANNEL_ID),
  );
  if (hololive == null) throw new Error();

  for (const performer of nijisanjiPerformers) {
    if (performer.youtubeChannelId == null) {
      continue;
    }

    const record = await performerRepository.findByYoutubeChannelId(
      new YoutubeChannelId(performer.youtubeChannelId),
    );
    if (record != null) {
      continue;
    }

    await createPerformer.invoke({
      name: performer.name,
      color: performer.color,
      youtubeChannelId: performer.youtubeChannelId,
      organizationId: nijisanji.id.value,
      description: performer.description ?? null,
      url: performer.url ?? null,
      twitterUsername: performer.twitterUsername ?? null,
    });
  }

  for (const performer of hololivePerformers) {
    if (performer.youtubeChannelId == null) {
      continue;
    }

    const record = await performerRepository.findByYoutubeChannelId(
      new YoutubeChannelId(performer.youtubeChannelId),
    );
    if (record != null) {
      continue;
    }

    await createPerformer.invoke({
      name: performer.name,
      color: performer.color,
      youtubeChannelId: performer.youtubeChannelId,
      organizationId: hololive.id.value,
      description: performer.description ?? null,
      url: performer.url ?? null,
      twitterUsername: performer.twitterUsername ?? null,
    });
  }
};

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
