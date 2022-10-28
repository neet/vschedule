import { Schemas } from '@ril/api-client';
import { injectable } from 'inversify';

import {
  Actor,
  MediaAttachment,
  Performer,
  Stream,
} from '../../domain/entities';

@injectable()
export class RestApiPresenter {
  public presentMediaAttachment(
    mediaAttachment: MediaAttachment,
  ): Schemas.MediaAttachment {
    return {
      id: mediaAttachment.id.value,
      url: `/api/v1/media/${mediaAttachment.id.value}.${mediaAttachment.extension}`,
      blur: `data:image/png;base64,${encodeURIComponent(
        mediaAttachment.blur.toString('base64'),
      )}`,
      filename: mediaAttachment.filename.value,
      createdAt: mediaAttachment.createdAt.toISOString(),
      updatedAt: mediaAttachment.updatedAt.toISOString(),
    };
  }

  public presentActor(actor: Actor): Schemas.Actor {
    return {
      id: actor.id.value,
      name: actor.name.value,
      color: actor.color.value,
      description: actor.description?.value,
      twitterUsername: actor.twitterUsername?.value,
      avatar:
        actor.avatar != null
          ? this.presentMediaAttachment(actor.avatar)
          : undefined,
    };
  }

  public presentPerformer(actor: Performer): Schemas.Performer {
    return {
      ...this.presentActor(actor),
      youtubeChannelId: actor.youtubeChannelId.value,
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
