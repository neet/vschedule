import {
  Actor,
  MediaAttachment,
  Organization,
  Performer,
  Stream,
} from '@prisma/client';
import Color from 'color';
import dayjs from 'dayjs';

import { UnexpectedError } from '../../app/errors/UnexpectedError';
import {
  ActorDto,
  OrganizationDto,
  PerformerDto,
  StreamDto,
} from '../../app/query-services';
import { TwitterUsername, YoutubeChannelId } from '../../domain/_shared';
import {
  ActorDescription,
  ActorName,
  OrganizationId,
  PerformerId,
  StreamDescription,
  StreamId,
  StreamTitle,
} from '../../domain/entities';
import { rehydrateMediaAttachmentFromPrisma } from './PrismaMapper';

export const transferActorFromPrisma = (
  actor: Actor & { avatar: MediaAttachment | null },
): ActorDto => {
  return {
    name: new ActorName(actor.name),
    color: new Color(actor.color),

    description:
      actor.description != null
        ? new ActorDescription(actor.description)
        : null,

    avatar:
      actor.avatar != null
        ? rehydrateMediaAttachmentFromPrisma(actor.avatar)
        : null,

    url: actor.url != null ? new URL(actor.url) : null,

    twitterUsername:
      actor.twitterUsername != null
        ? new TwitterUsername(actor.twitterUsername)
        : null,

    youtubeChannelId:
      actor.youtubeChannelId != null
        ? new YoutubeChannelId(actor.youtubeChannelId)
        : null,
  };
};

export const transferOrganizationFromPrisma = (
  organization: Organization & {
    actor: (Actor & { avatar: MediaAttachment | null }) | null;
  },
): OrganizationDto => {
  if (organization.actor == null) {
    throw new UnexpectedError();
  }

  return {
    ...transferActorFromPrisma(organization.actor),
    id: new OrganizationId(organization.id),
    createdAt: dayjs(organization.createdAt),
    updatedAt: dayjs(organization.updatedAt),
  };
};

export const transferPerformerFromPrisma = (
  performer: Performer & {
    actor: (Actor & { avatar: MediaAttachment | null }) | null;
    organization:
      | (Organization & {
          actor: (Actor & { avatar: MediaAttachment | null }) | null;
        })
      | null;
  },
): PerformerDto => {
  if (performer.actor == null) {
    throw new UnexpectedError();
  }

  return {
    ...transferActorFromPrisma(performer.actor),
    id: new PerformerId(performer.id),
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
      actor: (Actor & { avatar: MediaAttachment | null }) | null;
      organization:
        | (Organization & {
            actor: (Actor & { avatar: MediaAttachment | null }) | null;
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
    duration: null,
  };
};
