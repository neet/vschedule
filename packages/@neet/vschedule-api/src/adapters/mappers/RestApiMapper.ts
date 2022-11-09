import { URL } from 'node:url';

import { Schemas } from '@neet/vschedule-api-client';
import { inject, injectable } from 'inversify';

import { IAppConfig } from '../../app/services/AppConfig/AppConfig';
import { unwrap } from '../../domain/_core';
import {
  Actor,
  MediaAttachment,
  Organization,
  Performer,
  Stream,
} from '../../domain/entities';
import { TYPES } from '../../types';

@injectable()
export class RestApiPresenter {
  private readonly _origin: string;

  public constructor(
    @inject(TYPES.AppConfig)
    config: IAppConfig,
  ) {
    this._origin = config.entries.server.origin;
  }

  public presentMediaAttachment(
    mediaAttachment: MediaAttachment,
  ): Schemas.MediaAttachment {
    const pathname = `/rest/v1/media/${mediaAttachment.filename.value}`;
    const url = new URL(this._origin);
    url.pathname = pathname;

    return {
      id: mediaAttachment.id.value,
      url: url.toString(),
      base64: mediaAttachment.base64.value,
      width: mediaAttachment.width.value,
      height: mediaAttachment.height.value,
      filename: mediaAttachment.filename.value,
      createdAt: mediaAttachment.createdAt.toISOString(),
      updatedAt: mediaAttachment.updatedAt.toISOString(),
    };
  }

  public presentActor(actor: Actor): Schemas.Actor {
    return {
      name: actor.name.value,
      url: actor.url === null ? null : actor.url.toString(),
      color: actor.color.hex(),
      description: unwrap(actor.description),
      twitterUsername: unwrap(actor.twitterUsername),
      youtubeChannelId: unwrap(actor.youtubeChannelId),
      avatar:
        actor.avatar !== null
          ? this.presentMediaAttachment(actor.avatar)
          : undefined,
    };
  }

  public presentOrganization(organization: Organization): Schemas.Organization {
    return {
      ...this.presentActor(organization),
      id: organization.id.value,
      createdAt: organization.createdAt.toISOString(),
      updatedAt: organization.updatedAt.toISOString(),
    };
  }

  public presentPerformer(
    performer: Performer,
    organization: Organization | null,
  ): Schemas.Performer {
    return {
      ...this.presentActor(performer),
      id: performer.id.value,
      createdAt: performer.createdAt.toISOString(),
      updatedAt: performer.updatedAt.toISOString(),
      organization:
        organization !== null
          ? this.presentOrganization(organization)
          : undefined,
    };
  }

  public presentStream(
    stream: Stream,
    owner: Performer | null,
    ownerOrganization: Organization | null,
  ): Schemas.Stream {
    return {
      id: stream.id.value,
      title: stream.title.value,
      url: stream.url.toString(),
      description: unwrap(stream.description),
      createdAt: stream.createdAt.toISOString(),
      updatedAt: stream.updatedAt.toISOString(),
      startedAt: stream.startedAt.toISOString(),
      endedAt: stream.endedAt === null ? null : stream.endedAt.toISOString(),
      owner:
        owner === null
          ? undefined
          : this.presentPerformer(owner, ownerOrganization),
      duration: stream.duration === null ? null : stream.duration.toISOString(),
      casts: [], // TODO
      thumbnail:
        stream.thumbnail !== null
          ? this.presentMediaAttachment(stream.thumbnail)
          : undefined,
    };
  }
}
