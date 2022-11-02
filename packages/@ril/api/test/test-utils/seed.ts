import { IOrganizationRepository } from '../../src/app/repositories/OrganizationRepository';
import { IPerformerRepository } from '../../src/app/repositories/PerformerRepository';
import { CreateOrganization } from '../../src/app/use-cases/CreateOrganization';
import { CreatePerformer } from '../../src/app/use-cases/CreatePerformer';
import { YoutubeChannelId } from '../../src/domain/_shared';
import { container } from '../../src/infra/inversify-config';
import { TYPES } from '../../src/types';

export const installSeed = async () => {
  const createOrganization = container.get(CreateOrganization);
  const performerRepository = container.get<IPerformerRepository>(
    TYPES.PerformerRepository,
  );
  const organizationRepository = container.get<IOrganizationRepository>(
    TYPES.OrganizationRepository,
  );

  if (
    (await performerRepository.findByYoutubeChannelId(
      new YoutubeChannelId('UCIqEvFk7y5-VhSJopkjebMA'),
    )) == null
  ) {
    await createOrganization.invoke({
      name: 'Demo organization',
      url: null,
      description: null,
      color: null,
      youtubeChannelId: 'UCIqEvFk7y5-VhSJopkjebMA',
      twitterUsername: null,
    });
  }

  const organization = await organizationRepository.findByYoutubeChannelId(
    new YoutubeChannelId('UCIqEvFk7y5-VhSJopkjebMA'),
  );

  const createPerformer = container.get(CreatePerformer);
  await createPerformer.invoke({
    youtubeChannelId: 'UCjXHjE-OBd--vYcT83XdzTA',
    url: null,
    twitterUsername: null,
    organizationId: organization?.id.value ?? null,
  });
};
