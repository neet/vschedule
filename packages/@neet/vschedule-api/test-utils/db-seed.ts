import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

import { IConfig } from '../src/app';

export const SEED_ORGANIZATION_ID = 'x8WCU1lK79smcYy_mk_1V';
export const SEED_PERFORMER_ID = '1ebCtG0ZwzyfEuMCE3iyE';
export const SEED_STREAM_ID = '7HQVgnsDEOorzKgjNKJ6n';
export const SEED_USER_ID = 'rrCoMB5uaoqjDNU79_oFT';

export const createSeed = async (config: IConfig): Promise<void> => {
  const client = new PrismaClient();

  await client.user.create({
    data: {
      id: SEED_USER_ID,
      email: 'test@example.com',
      passwordHash: hashSync('password', config.secrets.passwordSalt),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await client.organization.create({
    data: {
      id: SEED_ORGANIZATION_ID,
      name: 'にじさんじ',
      color: '#ffffff',
      url: 'https://www.nijisanji.jp/',
      description: `「にじさんじ」は、人気バーチャルライバー（VTuber）を始めとして、個性を存分に活かした多種多様なインフルエンサーが所属するバーチャルライバープロジェクトです。`,
      youtubeChannelId: 'UCX7YkU9nEeaoZbkVLVajcMg',
      twitterUsername: 'nijisanji_app',
      createdAt: new Date('2022-11-03T12:06:13.481Z'),
      updatedAt: new Date('2022-11-03T12:06:13.481Z'),
    },
  });

  await client.performer.create({
    data: {
      id: SEED_PERFORMER_ID,
      name: '鷹宮リオン',
      color: '#ffffff',
      description: `有数の金持ちが集う魔法学校、私立帝華高校の2年生 17歳。`,
      url: 'https://marshmallow-qa.com/takamiyarion',
      youtubeChannelId: 'UCV5ZZlLjk5MKGg3L0n0vbzw',
      twitterUsername: 'TakamiyaRion',
      organization: {
        connect: {
          id: SEED_ORGANIZATION_ID,
        },
      },
      createdAt: new Date('2022-11-03T12:11:17.260Z'),
      updatedAt: new Date('2022-11-03T12:11:17.260Z'),
    },
  });

  await client.stream.create({
    data: {
      id: SEED_STREAM_ID,
      url: `https://www.youtube.com/watch?v=XXUNsT5gd_o`,
      title: `【3Dお披露目】ファンボファンガに、最後まで最高のファンサ【#鷹宮リオン3D】`,
      description: `忘れないで 特別な日になりますように\n共に歌おうずっと！共に歩もうずっと！`,
      createdAt: new Date('2022-11-03T12:11:17.260Z'),
      updatedAt: new Date('2022-11-03T12:11:17.260Z'),
      startedAt: new Date('2022-11-03T12:11:17.260Z'),
      endedAt: new Date('2022-11-03T12:11:17.260Z'),
      owner: {
        connect: {
          id: SEED_PERFORMER_ID,
        },
      },
    },
  });

  await client.$disconnect();
};
