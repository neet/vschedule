import {
  MediaAttachment,
  Organization,
  Performer,
  Stream,
} from '@prisma/client';
import Color from 'color';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';

import {
  MediaAttachmentDto,
  OrganizationDto,
  PerformerDto,
  StreamDto,
} from '../../app';

dayjs.extend(Duration);

export const transferMediaAttachmentFromPrisma = (
  mediaAttachment: MediaAttachment,
): MediaAttachmentDto => {
  return {
    id: mediaAttachment.id,
    filename: mediaAttachment.filename,
    width: mediaAttachment.width,
    height: mediaAttachment.height,
    blurDataUri: mediaAttachment.blurDataUri,
    bucket: mediaAttachment.bucket,
    remoteUrl:
      mediaAttachment.remoteUrl != null
        ? new URL(mediaAttachment.remoteUrl)
        : null,
    createdAt: dayjs(mediaAttachment.createdAt),
    updatedAt: dayjs(mediaAttachment.updatedAt),
  };
};

export const transferOrganizationFromPrisma = (
  organization: Organization & { avatar: MediaAttachment | null },
): OrganizationDto => {
  return {
    id: organization.id,
    name: organization.name,
    color: new Color(organization.color),
    description: organization.description,
    avatar:
      organization.avatar != null
        ? transferMediaAttachmentFromPrisma(organization.avatar)
        : null,
    url: organization.url != null ? new URL(organization.url) : null,
    twitterUsername: organization.twitterUsername,
    youtubeChannelId: organization.youtubeChannelId,
    createdAt: dayjs(organization.createdAt),
    updatedAt: dayjs(organization.updatedAt),
  };
};

export const transferPerformerFromPrisma = (
  performer: Performer & {
    avatar: MediaAttachment | null;
    organization:
      | (Organization & {
          avatar: MediaAttachment | null;
        })
      | null;
  },
): PerformerDto => {
  return {
    id: performer.id,
    name: performer.name,
    color: new Color(performer.color),
    description: performer.description,
    avatar:
      performer.avatar != null
        ? transferMediaAttachmentFromPrisma(performer.avatar)
        : null,
    url: performer.url != null ? new URL(performer.url) : null,
    twitterUsername: performer.twitterUsername,
    youtubeChannelId: performer.youtubeChannelId,
    organization:
      performer.organization != null
        ? transferOrganizationFromPrisma(performer.organization)
        : null,
    createdAt: dayjs(performer.createdAt),
    updatedAt: dayjs(performer.updatedAt),
  };
};

export const transferStreamFromPrisma = (
  stream: Stream & {
    owner: Performer & {
      avatar: MediaAttachment | null;
      organization:
        | (Organization & {
            avatar: MediaAttachment | null;
          })
        | null;
    };
    thumbnail: MediaAttachment | null;
  },
): StreamDto => {
  return {
    id: stream.id,
    title: stream.title,
    description: stream.description,
    url: new URL(stream.url),
    thumbnail:
      stream.thumbnail != null
        ? transferMediaAttachmentFromPrisma(stream.thumbnail)
        : null,
    owner: transferPerformerFromPrisma(stream.owner),
    casts: [], // TODO

    startedAt: dayjs(stream.startedAt),
    endedAt: stream.endedAt != null ? dayjs(stream.endedAt) : null,
    createdAt: dayjs(stream.createdAt),
    updatedAt: dayjs(stream.updatedAt),

    // TODO: どうするか考える
    duration:
      stream.endedAt != null
        ? dayjs.duration(dayjs(stream.endedAt).diff(stream.startedAt))
        : null,
  };
};
