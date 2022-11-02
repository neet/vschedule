import dayjs from 'dayjs';
import { URL } from 'url';

import { Color } from '../../domain/_shared';
import { Timestamps } from '../../domain/_shared/Timestamps';
import {
  Actor,
  MediaAttachment,
  Organization,
  Performer,
  Stream,
} from '../../domain/entities';
import * as Prisma from '.prisma/client';

export const rehydrateMediaAttachmentFromPrisma = (
  mediaAttachment: Prisma.MediaAttachment,
) => {
  return MediaAttachment.rehydrate({
    id: mediaAttachment.id,
    base64: mediaAttachment.base64,
    filename: mediaAttachment.filename,
    width: mediaAttachment.width,
    height: mediaAttachment.height,
    bucket: mediaAttachment.bucket,
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
    color: Color.fromHex(actor.color),
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
