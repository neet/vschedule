import { URL } from 'node:url';

import { Schemas } from '@ril/api-client';
import { inject, injectable } from 'inversify';

import { IAppConfig } from '../../app/services/AppConfig/AppConfig';
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
    const pathname = `/api/v1/media/${mediaAttachment.id.value}.${mediaAttachment.extension}`;
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
      id: actor.id.value,
      name: actor.name.value,
      url: actor.url?.toString(),
      color: actor.color.value,
      description: actor.description?.value,
      twitterUsername: actor.twitterUsername?.value,
      youtubeChannelId: actor.youtubeChannelId?.value,
      avatar:
        actor.avatar != null
          ? this.presentMediaAttachment(actor.avatar)
          : undefined,
    };
  }

  public presentPerformer(
    performer: Performer,
    organization: Organization,
  ): Schemas.Performer {
    return {
      ...this.presentActor(performer),
      organization: this.presentActor(organization),
    };
  }

  public presentStream(stream: Stream): Schemas.Stream {
    return {
      id: stream.id.value,
      title: stream.title.value,
      url: stream.url.toString(),
      description: stream.description?.value,
      createdAt: stream.createdAt.toISOString(),
      updatedAt: stream.updatedAt.toISOString(),
      startedAt: stream.startedAt.toISOString(),
      endedAt: stream.endedAt?.toISOString(),
      actor: this.presentActor(stream.actor),
      duration: stream.duration?.toISOString(),
      thumbnail:
        stream.thumbnail != null
          ? this.presentMediaAttachment(stream.thumbnail)
          : undefined,
    };
  }
}
