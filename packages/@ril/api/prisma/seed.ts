import 'reflect-metadata';

import {
  hololive as hololivePerformers,
  HOLOLIVE_YOUTUBE_CHANNEL_ID,
  nijisanji as nijisanjiPerformers,
  NIJISANJI_YOUTUBE_CHANNEL_ID,
  organizations,
} from '@ril/seeds';

import { IOrganizationRepository } from '../src/app/repositories/OrganizationRepository';
import { IPerformerRepository } from '../src/app/repositories/PerformerRepository';
import { CreateOrganization } from '../src/app/use-cases/CreateOrganization';
import { CreatePerformer } from '../src/app/use-cases/CreatePerformer';
import { YoutubeChannelId } from '../src/domain/_shared';
import { container } from '../src/infra/inversify-config';
import { TYPES } from '../src/types';

const createOrganization = container.get(CreateOrganization);
const createPerformer = container.get(CreatePerformer);
const performerRepository = container.get<IPerformerRepository>(
  TYPES.PerformerRepository,
);
const organizationRepository = container.get<IOrganizationRepository>(
  TYPES.OrganizationRepository,
);

const main = async (): Promise<void> => {
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
      url: organization.url,
      description: organization.description,
      youtubeChannelId: organization.youtubeChannelId,
      twitterUsername: organization.twitterUsername,
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
      description: performer.description,
      url: performer.url,
      youtubeChannelId: performer.youtubeChannelId,
      twitterUsername: performer.twitterUsername,
      organizationId: nijisanji.id.value,
      websubEnabled: false,
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
      description: performer.description,
      url: performer.url,
      youtubeChannelId: performer.youtubeChannelId,
      twitterUsername: performer.twitterUsername,
      organizationId: hololive.id.value,
      websubEnabled: false,
    });
  }
};

main().catch((error) => {
  throw error;
});
