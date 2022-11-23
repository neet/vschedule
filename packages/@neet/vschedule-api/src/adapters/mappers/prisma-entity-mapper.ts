import assert from 'node:assert';

import * as Prisma from '@prisma/client';
import Color from 'color';
import dayjs from 'dayjs';

import {
  Channel,
  ChannelDescription,
  ChannelId,
  ChannelName,
  ChannelStatus,
  ChannelYoutube,
  MediaAttachment,
  Organization,
  OrganizationId,
  Performer,
  PerformerId,
  Stream,
  Timestamps,
  Token,
  User,
  YoutubeChannelId,
} from '../../domain';

const panic = (error: unknown): never => {
  throw error;
};

export const rehydrateMediaAttachmentFromPrisma = (
  mediaAttachment: Prisma.MediaAttachment,
): MediaAttachment => {
  return MediaAttachment.rehydrate({
    id: mediaAttachment.id,
    blurDataUri: mediaAttachment.blurDataUri,
    filename: mediaAttachment.filename,
    width: mediaAttachment.width,
    height: mediaAttachment.height,
    bucket: mediaAttachment.bucket,
    remoteUrl:
      mediaAttachment.remoteUrl !== null
        ? new URL(mediaAttachment.remoteUrl)
        : null,
    timestamps: new Timestamps({
      createdAt: dayjs(mediaAttachment.createdAt),
      updatedAt: dayjs(mediaAttachment.updatedAt),
    }),
  });
};

export const rehydratePerformerFromPrisma = (
  performer: Prisma.Performer & {
    avatar: Prisma.MediaAttachment | null;
  },
): Performer => {
  return Performer.rehydrate({
    id: performer.id,
    name: performer.name,
    description: performer.description,
    color: new Color(performer.color),
    twitterUsername: performer.twitterUsername,
    youtubeChannelId: performer.youtubeChannelId,
    avatar:
      performer.avatar !== null
        ? rehydrateMediaAttachmentFromPrisma(performer.avatar)
        : null,
    url: performer.url !== null ? new URL(performer.url) : null,
    organizationId: performer.organizationId,
    timestamps: new Timestamps({
      createdAt: dayjs(performer.createdAt),
      updatedAt: dayjs(performer.updatedAt),
    }),
  });
};

export const rehydrateOrganizationFromPrisma = (
  organization: Prisma.Organization & {
    avatar: Prisma.MediaAttachment | null;
  },
): Organization => {
  return Organization.rehydrate({
    id: organization.id,
    name: organization.name,
    description: organization.description,
    color: new Color(organization.color),
    twitterUsername: organization.twitterUsername,
    youtubeChannelId: organization.youtubeChannelId,
    avatar:
      organization.avatar !== null
        ? rehydrateMediaAttachmentFromPrisma(organization.avatar)
        : null,
    url: organization.url !== null ? new URL(organization.url) : null,
    timestamps: new Timestamps({
      createdAt: dayjs(organization.createdAt),
      updatedAt: dayjs(organization.updatedAt),
    }),
  });
};

export const rehydrateStreamFromPrisma = (
  stream: Prisma.Stream & {
    thumbnail: Prisma.MediaAttachment | null;
  },
) => {
  return Stream.rehydrate({
    id: stream.id,
    url: new URL(stream.url),
    startedAt: dayjs(stream.startedAt),
    timestamps: new Timestamps({
      createdAt: dayjs(stream.createdAt),
      updatedAt: dayjs(stream.updatedAt),
    }),
    ownerId: stream.ownerId,
    participantIds: [], // TODO キャスト
    channelId: stream.channelId,
    description: stream.description,
    title: stream.title,
    endedAt: stream.endedAt !== null ? dayjs(stream.endedAt) : null,
    thumbnail:
      stream.thumbnail !== null
        ? rehydrateMediaAttachmentFromPrisma(stream.thumbnail)
        : null,
  });
};

export const rehydrateTokenFromPrisma = (token: Prisma.Token) => {
  return Token.rehydrate({
    id: token.id,
    createdAt: dayjs(token.createdAt),
    expiresAt: dayjs(token.expiresAt),
  });
};

export const rehydrateUserFromPrisma = (user: Prisma.User) => {
  return User.rehydrate({
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    timestamps: new Timestamps({
      createdAt: dayjs(user.createdAt),
      updatedAt: dayjs(user.updatedAt),
    }),
  });
};

export const rehydrateYoutubeChannelFromPrisma = (
  channel: Prisma.Channel & { youtubeChannel: Prisma.YoutubeChannel | null },
): Channel => {
  assert(channel.youtubeChannel != null);
  return ChannelYoutube.rehydrate({
    id: new ChannelId(channel.id),
    name: new ChannelName(channel.name),
    description:
      channel.description != null
        ? new ChannelDescription(channel.description)
        : null,
    status: channel.status as ChannelStatus,
    ownerId:
      channel.performerId != null
        ? new PerformerId(channel.performerId)
        : channel.organizationId != null
        ? new OrganizationId(channel.organizationId)
        : panic('unexpected'),
    youtubeChannelId: new YoutubeChannelId(
      channel.youtubeChannel.youtubeChannelId,
    ),
  });
};

export const rehydrateChannelFromPrisma = (
  channel: Prisma.Channel & { youtubeChannel: Prisma.YoutubeChannel | null },
): Channel => {
  if (channel.youtubeChannel != null) {
    return rehydrateYoutubeChannelFromPrisma(channel);
  }
  throw new Error('inexhaustible');
};
