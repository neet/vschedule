import {
  Actor,
  MediaAttachment,
  Organization,
  Performer,
  Stream,
} from '@prisma/client';
import assert from 'assert';
import Color from 'color';
import dayjs from 'dayjs';

import { OrganizationDto } from '../../organizations/app';
import { OrganizationId } from '../../organizations/domain';
import { PerformerDto } from '../../performers/app/performer-dto';
import { PerformerId } from '../../performers/domain';
import { StreamDto } from '../../streams/app/stream-dto';
import { StreamDescription, StreamId, StreamTitle } from '../../streams/domain';
import { ActorDto } from '../app';
import {
  ActorDescription,
  ActorName,
  TwitterUsername,
  YoutubeChannelId,
} from '../domain';
import { rehydrateMediaAttachmentFromPrisma } from './prisma-entity-mapper';

export const transferActorFromPrisma = (
  actor: Actor & { avatar: MediaAttachment | null },
): ActorDto => {
  assert(actor.avatar != null);

  return {
    name: new ActorName(actor.name),
    color: new Color(actor.color),

    description:
      actor.description != null
        ? new ActorDescription(actor.description)
        : null,

    avatar: rehydrateMediaAttachmentFromPrisma(actor.avatar),
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
  assert(organization.actor != null);

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
  assert(performer.actor != null);

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
  assert(stream.thumbnail != null);

  return {
    id: new StreamId(stream.id),
    title: new StreamTitle(stream.title),
    description:
      stream.description != null
        ? new StreamDescription(stream.description)
        : null,
    url: new URL(stream.url),
    thumbnail: rehydrateMediaAttachmentFromPrisma(stream.thumbnail),
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
