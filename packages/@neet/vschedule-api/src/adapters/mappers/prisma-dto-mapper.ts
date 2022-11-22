import {
  MediaAttachment,
  Organization,
  Performer,
  Stream,
} from '@prisma/client';
import Color from 'color';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';

import { OrganizationDto, PerformerDto, StreamDto } from '../../app';
import {
  OrganizationDescription,
  OrganizationId,
  OrganizationName,
  PerformerDescription,
  PerformerId,
  PerformerName,
  StreamDescription,
  StreamId,
  StreamTitle,
  TwitterUsername,
  YoutubeChannelId,
} from '../../domain';
import { rehydrateMediaAttachmentFromPrisma } from './prisma-entity-mapper';

dayjs.extend(Duration);

export const transferOrganizationFromPrisma = (
  organization: Organization & { avatar: MediaAttachment | null },
): OrganizationDto => {
  return {
    id: new OrganizationId(organization.id),
    name: new OrganizationName(organization.name),
    color: new Color(organization.color),
    description:
      organization.description != null
        ? new OrganizationDescription(organization.description)
        : null,
    avatar:
      organization.avatar != null
        ? rehydrateMediaAttachmentFromPrisma(organization.avatar)
        : null,

    url: organization.url != null ? new URL(organization.url) : null,
    twitterUsername:
      organization.twitterUsername != null
        ? new TwitterUsername(organization.twitterUsername)
        : null,
    youtubeChannelId:
      organization.youtubeChannelId != null
        ? new YoutubeChannelId(organization.youtubeChannelId)
        : null,
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
    id: new PerformerId(performer.id),
    name: new PerformerName(performer.name),
    color: new Color(performer.color),
    description:
      performer.description != null
        ? new PerformerDescription(performer.description)
        : null,
    avatar:
      performer.avatar != null
        ? rehydrateMediaAttachmentFromPrisma(performer.avatar)
        : null,
    url: performer.url != null ? new URL(performer.url) : null,
    twitterUsername:
      performer.twitterUsername != null
        ? new TwitterUsername(performer.twitterUsername)
        : null,
    youtubeChannelId:
      performer.youtubeChannelId != null
        ? new YoutubeChannelId(performer.youtubeChannelId)
        : null,
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
    id: new StreamId(stream.id),
    title: new StreamTitle(stream.title),
    description:
      stream.description != null
        ? new StreamDescription(stream.description)
        : null,
    url: new URL(stream.url),
    thumbnail:
      stream.thumbnail != null
        ? rehydrateMediaAttachmentFromPrisma(stream.thumbnail)
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
