import 'reflect-metadata';

// なんか exports みてくれない
import { performers as hololive } from '@neet/vschedule-seed/dist/hololive.json';
import { performers as nijisanji } from '@neet/vschedule-seed/dist/nijisanji.json';
import { organizations } from '@neet/vschedule-seed/dist/organizations.json';
import { PrismaClient } from '@prisma/client';

import {
  ILogger,
  ShowOrganization,
  UpsertOrganization,
  UpsertPerformer,
} from '../src/app';
import { container } from '../src/infra/inversify-config';
import { TYPES } from '../src/types';

const prisma = container.get<PrismaClient>(TYPES.PrismaClient);
const logger = container.get<ILogger>(TYPES.Logger);
const showOrganization = container.get(ShowOrganization);
const upsertOrganization = container.get(UpsertOrganization);
const upsertPerformer = container.get(UpsertPerformer);

const main = async (): Promise<void> => {
  logger.info(`Seeding ${organizations.length} organizations...`);
  for (const organization of organizations) {
    await upsertOrganization.invoke({
      name: organization.name,
      // description: organization.description ?? null,
      description: null,
      url: organization.url ?? null,
      color: organization.color,
      twitterUsername: organization.twitterUsername ?? null,
      youtubeChannelId: organization.youtubeChannelId,
    });
  }

  const nijisanjiOrg = await showOrganization.invoke({
    youtubeChannelId: 'UCX7YkU9nEeaoZbkVLVajcMg',
  });
  const hololiveOrg = await showOrganization.invoke({
    youtubeChannelId: 'UCJFZiqLMntJufDCHc6bQixg',
  });

  logger.info(`Seeding ${nijisanji.length} performers...`);
  for (const performer of nijisanji) {
    await upsertPerformer.invoke({
      name: performer.name,
      color: performer.color,
      youtubeChannelId: performer.youtubeChannelId,
      organizationId: nijisanjiOrg.id.value,
      description: performer.description ?? null,
      // url: performer.url ?? null,
      url: null,
      twitterUsername: performer.twitterUsername ?? null,
    });
  }

  logger.info(`Seeding ${hololive.length} performers...`);
  for (const performer of hololive) {
    await upsertPerformer.invoke({
      name: performer.name,
      color: performer.color,
      youtubeChannelId: performer.youtubeChannelId,
      organizationId: hololiveOrg.id.value,
      // description: performer.description ?? null,
      description: null,
      url: performer.url ?? null,
      twitterUsername: performer.twitterUsername ?? null,
    });
  }
};

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
