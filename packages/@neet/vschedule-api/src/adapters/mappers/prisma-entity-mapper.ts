import * as Prisma from '@prisma/client';
import Color from 'color';
import dayjs from 'dayjs';
import { URL } from 'url';

import {
  Actor,
  MediaAttachment,
  Organization,
  Performer,
  Stream,
  Timestamps,
  Token,
  User,
} from '../../domain';

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

const rehydrateActorFromPrisma = (
  actor: Prisma.Actor & { avatar: Prisma.MediaAttachment | null },
) => {
  return Actor.rehydrate({
    // id: actor.id
    name: actor.name,
    description: actor.description,
    color: new Color(actor.color),
    twitterUsername: actor.twitterUsername,
    youtubeChannelId: actor.youtubeChannelId,
    avatar:
      actor.avatar !== null
        ? rehydrateMediaAttachmentFromPrisma(actor.avatar)
        : null,
    url: actor.url !== null ? new URL(actor.url) : null,
  });
};

export const rehydratePerformerFromPrisma = (
  performer: Prisma.Performer & {
    actor:
      | (Prisma.Actor & {
          avatar: Prisma.MediaAttachment | null;
        })
      | null;
  },
): Performer => {
  if (performer.actor === null) {
    throw new Error(`isolated performer ${performer.id}`);
  }

  return Performer.rehydrate({
    ...rehydrateActorFromPrisma(performer.actor),
    id: performer.id,
    organizationId: performer.organizationId,
    timestamps: new Timestamps({
      createdAt: dayjs(performer.createdAt),
      updatedAt: dayjs(performer.updatedAt),
    }),
  });
};

export const rehydrateOrganizationFromPrisma = (
  organization: Prisma.Organization & {
    actor:
      | (Prisma.Actor & {
          avatar: Prisma.MediaAttachment | null;
        })
      | null;
  },
): Organization => {
  if (organization.actor == null) {
    throw new Error(`isolated organization ${organization.id}`);
  }

  return Organization.rehydrate({
    ...rehydrateActorFromPrisma(organization.actor),
    id: organization.id,
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
    castIds: [], // TODO キャスト
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
