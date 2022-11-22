import { URL } from 'node:url';

import { inject, injectable } from 'inversify';

import {
  IConfig,
  MediaAttachmentDto,
  OrganizationDto,
  PerformerDto,
  StreamDto,
} from '../../app';
import { User } from '../../domain';
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
    mediaAttachment: MediaAttachmentDto,
  ): Rest.MediaAttachment {
    const pathname = `/rest/v1/media/${mediaAttachment.filename}`;
    const url = new URL(this._origin);
    url.pathname = pathname;

    return {
      id: mediaAttachment.id,
      url: url.toString(),
      blurDataUri: mediaAttachment.blurDataUri,
      width: mediaAttachment.width,
      height: mediaAttachment.height,
      filename: mediaAttachment.filename,
      createdAt: mediaAttachment.createdAt.toISOString(),
      updatedAt: mediaAttachment.updatedAt.toISOString(),
    };
  }

  public presentOrganization(organization: OrganizationDto): Rest.Organization {
    return {
      id: organization.id,
      name: organization.name,
      url: organization.url === null ? null : organization.url.toString(),
      color: organization.color.hex(),
      description: organization.description,
      twitterUsername: organization.twitterUsername,
      youtubeChannelId: organization.youtubeChannelId,
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
      id: performer.id,
      name: performer.name,
      url: performer.url === null ? null : performer.url.toString(),
      color: performer.color.hex(),
      description: performer.description,
      twitterUsername: performer.twitterUsername,
      youtubeChannelId: performer.youtubeChannelId,
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
      id: stream.id,
      title: stream.title,
      url: stream.url.toString(),
      description: stream.description,
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
