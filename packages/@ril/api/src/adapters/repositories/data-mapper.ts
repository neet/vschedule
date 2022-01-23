import dayjs from 'dayjs';
import {
  Actor,
  ActorName,
  HexColor,
  MediaAttachment,
  MediaAttachmentBucket,
  MediaAttachmentFilename,
  Stream,
  StreamTitle,
  Url,
  Uuid,
  YoutubeChannelId,
} from '@ril/core';

import * as Prisma from '.prisma/client';

export const createMediaAttachmentFromPrisma = (
  mediaAttachment: Prisma.MediaAttachment,
) => {
  return MediaAttachment.from({
    id: Uuid.from(mediaAttachment.id),
    blur: Buffer.from(mediaAttachment.blur, 'base64'),
    filename: MediaAttachmentFilename.from(mediaAttachment.filename),
    bucket:
      mediaAttachment.bucket != null
        ? MediaAttachmentBucket.from(mediaAttachment.bucket)
        : undefined,
    createdAt: dayjs(mediaAttachment.createdAt),
    updatedAt: dayjs(mediaAttachment.updatedAt),
  });
};

export const createActorFromPrisma = (
  actor: Prisma.Actor & { avatar: Prisma.MediaAttachment | null },
) => {
  return Actor.from({
    id: Uuid.from(actor.id),
    name: ActorName.from(actor.name),
    color: HexColor.from(actor.color),
    youtubeChannelId: YoutubeChannelId.from(actor.youtubeChannelId),
    avatar:
      actor.avatar != null
        ? createMediaAttachmentFromPrisma(actor.avatar)
        : undefined,
  });
};

export const createStreamFromPrisma = (
  stream: Prisma.Stream & {
    actor: Prisma.Actor & { avatar: Prisma.MediaAttachment | null };
    thumbnail: Prisma.MediaAttachment | null;
  },
) => {
  return Stream.from({
    id: Uuid.from(stream.id),
    url: Url.from(stream.url),
    createdAt: dayjs(stream.createdAt),
    updatedAt: dayjs(stream.updatedAt),
    startedAt: dayjs(stream.startedAt),
    actor: createActorFromPrisma(stream.actor),
    endedAt: stream.endedAt != null ? dayjs(stream.endedAt) : undefined,
    title: StreamTitle.from(stream.title),
    thumbnail:
      stream.thumbnail != null
        ? createMediaAttachmentFromPrisma(stream.thumbnail)
        : undefined,
  });
};
