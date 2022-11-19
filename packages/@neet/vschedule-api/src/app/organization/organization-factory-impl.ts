import Color from 'color';
import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';

import {
  IMediaAttachmentRepository,
  IOrganizationFactory,
  MediaAttachmentFilename,
  Organization,
  OrganizationFactoryCreateParams,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { IYoutubeApiService } from '../_external';
import { AppError, ILogger, UnexpectedError } from '../_shared';

export class OrganizationFactoryChannelNotFoundError extends AppError {
  public readonly name = 'OrganizationFactoryChannelNotFoundError';

  public constructor(
    public readonly channelId: string,
    public readonly cause: unknown,
  ) {
    super(`No channel found by ID ${channelId}`);
  }
}

@injectable()
export class OrganizationFactory implements IOrganizationFactory {
  public constructor(
    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,

    @inject(TYPES.YoutubeApiService)
    private readonly _youtubeApiService: IYoutubeApiService,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public async create(
    params: OrganizationFactoryCreateParams,
  ): Promise<Organization> {
    const avatar = await this._inspectAvatar(params.youtubeChannelId);

    // prettier-ignore
    const color
      = params.color != null  ? new Color(params.color)
      : avatar?.color != null ? new Color(avatar.color.hex())
      : new Color('#000000');

    const organization = Organization.create({
      name: params.name,
      url: params.url,
      description: params.description,
      color,
      avatar: avatar?.mediaAttachment ?? null,
      youtubeChannelId: params.youtubeChannelId,
      twitterUsername: params.twitterUsername,
    });

    return organization;
  }

  private async _fetchYoutubeChannelById(id: YoutubeChannelId) {
    try {
      const channel = await this._youtubeApiService.fetchChannel(id.value);
      return channel;
    } catch (error) {
      throw new OrganizationFactoryChannelNotFoundError(id.value, error);
    }
  }

  private async _inspectAvatar(id: YoutubeChannelId | null) {
    if (id == null) {
      return null;
    }

    const channel = await this._fetchYoutubeChannelById(id);
    const url = new URL(channel.thumbnailUrl);
    const image = await fetch(url);
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    const mediaAttachment = await this._mediaAttachmentRepository.save(
      new MediaAttachmentFilename(`${id.value}_avatar.webp`),
      await sharp(imageBuffer).webp().toBuffer(),
      url,
    );

    const shade = await getColors(
      imageBuffer,
      image.headers.get('Content-Type') as string,
    );
    const primaryColor = shade[0];
    if (primaryColor == null) {
      this._logger.warning(
        `Could not find primary color for ${channel.thumbnailUrl}`,
      );
      throw new UnexpectedError();
    }

    return { mediaAttachment, color: primaryColor };
  }
}
