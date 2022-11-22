import { URL } from 'node:url';

import { inject, injectable } from 'inversify';

import { IConfig, OrganizationDto, PerformerDto, StreamDto } from '../../app';
import { MediaAttachment, unwrap, User } from '../../domain';
import { TYPES } from '../../types';
import * as Rest from '../generated/@types';

@injectable()
export class RestPresenter {
  private readonly _origin: string;

  public constructor(
    @inject(TYPES.Config)
    config: IConfig,
  ) {
    this._origin = config.server.origin;
  }

  public presentMediaAttachment(
    mediaAttachment: MediaAttachment,
  ): Rest.MediaAttachment {
    const pathname = `/rest/v1/media/${mediaAttachment.filename.value}`;
    const url = new URL(this._origin);
    url.pathname = pathname;

    return {
      id: mediaAttachment.id.value,
      url: url.toString(),
      blurDataUri: mediaAttachment.blurDataUri.value,
      width: mediaAttachment.width.value,
      height: mediaAttachment.height.value,
      filename: mediaAttachment.filename.value,
      createdAt: mediaAttachment.createdAt.toISOString(),
      updatedAt: mediaAttachment.updatedAt.toISOString(),
    };
  }

  public presentOrganization(organization: OrganizationDto): Rest.Organization {
    return {
      id: organization.id.value,
      name: organization.name.value,
      url: organization.url === null ? null : organization.url.toString(),
      color: organization.color.hex(),
      description: unwrap(organization.description),
      twitterUsername: unwrap(organization.twitterUsername),
      youtubeChannelId: unwrap(organization.youtubeChannelId),
      avatar:
        organization.avatar !== null
          ? this.presentMediaAttachment(organization.avatar)
          : undefined,
      createdAt: organization.createdAt.toISOString(),
      updatedAt: organization.updatedAt.toISOString(),
    };
  }

  public presentPerformer(performer: PerformerDto): Rest.Performer {
    return {
      id: performer.id.value,
      name: performer.name.value,
      url: performer.url === null ? null : performer.url.toString(),
      color: performer.color.hex(),
      description: unwrap(performer.description),
      twitterUsername: unwrap(performer.twitterUsername),
      youtubeChannelId: unwrap(performer.youtubeChannelId),
      avatar:
        performer.avatar !== null
          ? this.presentMediaAttachment(performer.avatar)
          : undefined,
      createdAt: performer.createdAt.toISOString(),
      updatedAt: performer.updatedAt.toISOString(),
      organization:
        performer.organization !== null
          ? this.presentOrganization(performer.organization)
          : undefined,
    };
  }

  public presentStream(stream: StreamDto): Rest.Stream {
    return {
      id: stream.id.value,
      title: stream.title.value,
      url: stream.url.toString(),
      description: unwrap(stream.description),
      createdAt: stream.createdAt.toISOString(),
      updatedAt: stream.updatedAt.toISOString(),
      startedAt: stream.startedAt.toISOString(),
      endedAt: stream.endedAt === null ? null : stream.endedAt.toISOString(),
      owner: this.presentPerformer(stream.owner),
      duration: stream.duration === null ? null : stream.duration.toISOString(),
      casts: [], // TODO
      thumbnail:
        stream.thumbnail !== null
          ? this.presentMediaAttachment(stream.thumbnail)
          : undefined,
    };
  }

  public presentUser(user: User): Rest.User {
    return {
      id: user.id.value,
      email: user.email.value,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
