import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

import { ShowOrganization } from '../src/app/organization/show-organization';
import { UpsertOrganization } from '../src/app/organization/upsert-organization';
import { TYPES } from '../src/types';
import { container } from '../test-utils/inversify-config';

describe('UpsertOrganization', () => {
  it('creates organization that is not exist in db', async () => {
    const upsert = container.get(UpsertOrganization);
    const show = container.get(ShowOrganization);

    await upsert.invoke({
      name: 'Hololive',
      color: '#ff0000',
      youtubeChannelId: 'UCjXHjE-OBd--vYcT83XdzTA',
      description: 'foo bar',
      url: 'https://example.com',
      twitterUsername: 'hololivetv',
    });

    const record = await show.invoke({
      youtubeChannelId: 'UCjXHjE-OBd--vYcT83XdzTA',
    });

    expect(record?.name.value).toBe('Hololive');
  });

  it('updates organization', async () => {
    const prisma = container.get<PrismaClient>(TYPES.PrismaClient);
    const upsert = container.get(UpsertOrganization);
    const show = container.get(ShowOrganization);

    await prisma.organization.create({
      data: {
        id: nanoid(),
        actor: {
          create: {
            id: nanoid(),
            name: 'にじさんじ',
            color: '#ffffff',
            url: 'https://www.nijisanji.jp/',
            description: `「にじさんじ」は、人気バーチャルライバー（VTuber）を始めとして、個性を存分に活かした多種多様なインフルエンサーが所属するバーチャルライバープロジェクトです。`,
            youtubeChannelId: 'UCjXHjE-OBd--vYcT83XdzTA',
            twitterUsername: null,
          },
        },
        createdAt: new Date('2022-11-03T12:06:13.481Z'),
        updatedAt: new Date('2022-11-03T12:06:13.481Z'),
      },
    });

    await upsert.invoke({
      name: 'にじさんじ2',
      color: '#ff0000',
      youtubeChannelId: 'UCjXHjE-OBd--vYcT83XdzTA',
      description: 'foo bar',
      url: 'https://example.com',
      twitterUsername: null,
    });

    const record = await show.invoke({
      youtubeChannelId: 'UCjXHjE-OBd--vYcT83XdzTA',
    });

    expect(record?.name.value).toBe('にじさんじ2');
  });
});
