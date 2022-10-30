import dayjs from 'dayjs';
import { URL } from 'url';

import {
  Actor,
  MediaAttachment,
  Organization,
  Performer,
  Stream,
} from '../../domain/entities';
import * as Prisma from '.prisma/client';

export const createMediaAttachmentFromPrisma = (
  mediaAttachment: Prisma.MediaAttachment,
) => {
  return MediaAttachment.fromPrimitive({
    id: mediaAttachment.id,
    base64: mediaAttachment.base64,
    filename: mediaAttachment.filename,
    width: mediaAttachment.width,
    height: mediaAttachment.height,
    bucket: mediaAttachment.bucket ?? undefined,
    createdAt: dayjs(mediaAttachment.createdAt),
    updatedAt: dayjs(mediaAttachment.updatedAt),
  });
};

export const createActorFromPrisma = (
  actor: Prisma.Actor & {
    avatar: Prisma.MediaAttachment | null;
    performer: Prisma.Performer | null;
    organization: Prisma.Organization | null;
  },
): Actor => {
  const baseProps = {
    id: actor.id,
    name: actor.name,
    color: actor.color,
    youtubeChannelId: actor.youtubeChannelId ?? undefined,
    avatar:
      actor.avatar != null
        ? createMediaAttachmentFromPrisma(actor.avatar)
        : undefined,
    url: actor.url != null ? new URL(actor.url) : undefined,
  };

  if (actor.performer != null) {
    return Performer.fromPrimitive({
      ...baseProps,
      organizationId: actor.performer?.organizationId ?? undefined,
    });
  }

  if (actor.organization != null) {
    return Organization.fromPrimitive({
      ...baseProps,
    });
  }

  throw new Error('Unknown actor type');
};

export const createStreamFromPrisma = (
  stream: Prisma.Stream & {
    actor:
      | (Prisma.Actor & {
          avatar: Prisma.MediaAttachment | null;
          performer: Prisma.Performer | null;
          organization: Prisma.Organization | null;
        })
      | null;
    thumbnail: Prisma.MediaAttachment | null;
  },
) => {
  if (stream.actor == null) {
    throw new Error('You forgot to JOIN actor');
  }

  return Stream.fromPrimitive({
    id: stream.id,
    url: new URL(stream.url),
    createdAt: dayjs(stream.createdAt),
    updatedAt: dayjs(stream.updatedAt),
    startedAt: dayjs(stream.startedAt),
    actor: createActorFromPrisma(stream.actor),
    title: stream.title,
    endedAt: stream.endedAt != null ? dayjs(stream.endedAt) : undefined,
    thumbnail:
      stream.thumbnail != null
        ? createMediaAttachmentFromPrisma(stream.thumbnail)
        : undefined,
  });
};
