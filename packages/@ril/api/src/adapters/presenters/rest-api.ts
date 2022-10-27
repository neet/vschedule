import { Actor, MediaAttachment, Stream } from '@ril/core';
import { injectable } from 'inversify';

@injectable()
export class RestApiPresenter {
  public presentMediaAttachment(mediaAttachment: MediaAttachment) {
    return {
      id: mediaAttachment.id,
      url: `/api/v1/media/${mediaAttachment.id}.${mediaAttachment.extension}`,
      blur: `data:image/png;base64,${encodeURIComponent(
        mediaAttachment.blur.toString('base64'),
      )}`,
      createdAt: mediaAttachment.createdAt.toISOString(),
      updatedAt: mediaAttachment.updatedAt.toISOString(),
    };
  }

  public presentActor(actor: Actor) {
    return {
      id: actor.id,
      name: actor.name,
      color: actor.color,
      description: actor.description,
      youtubeChannelId: actor.youtubeChannelId,
      twitterUsername: actor.twitterUsername,
      avatar:
        actor.avatar != null
          ? this.presentMediaAttachment(actor.avatar)
          : undefined,
    };
  }

  public presentStream(stream: Stream) {
    return {
      id: stream.id,
      title: stream.title,
      url: stream.url,
      description: stream.description,
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
