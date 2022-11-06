import Color from 'color';
import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { URL } from 'url';

import { MediaAttachmentFilename, Organization } from '../../domain/entities';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { ILogger } from '../services/Logger';
import { IYoutubeApiService } from '../services/YoutubeApiService';

export class CreateOrganizationChannelNotFoundError extends AppError {
  public readonly name = 'CreateOrganizationChannelNotFoundError';

  public constructor(
    public readonly channelId: string,
    public readonly cause: unknown,
  ) {
    super(`No channel found by ID ${channelId}`);
  }
}

export interface CreateOrganizationParams {
  readonly name: string;
  readonly url: string | null;
  readonly description: string | null;
  readonly color: string | null;
  readonly youtubeChannelId: string | null;
  readonly twitterUsername: string | null;
}

@injectable()
export class CreateOrganization {
  public constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,

    @inject(TYPES.YoutubeApiService)
    private readonly _youtubeApiService: IYoutubeApiService,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public async invoke(params: CreateOrganizationParams): Promise<Organization> {
    const { name, url, description, color, youtubeChannelId, twitterUsername } =
      params;

    // TODO: 汚い
    const r =
      youtubeChannelId != null
        ? await this._createAvatar(youtubeChannelId)
        : null;

    const organization = Organization.create({
      name,
      url: url != null ? new URL(url) : null,
      description: description === '' ? null : description,
      color:
        color != null
          ? new Color(color)
          : r?.color != null
          ? new Color(r?.color.hex())
          : new Color('#000000'),
      avatar: r?.avatar ?? null,
      youtubeChannelId,
      twitterUsername,
    });

    await this._organizationRepository.create(organization);
    this._logger.info(`Organization with ID ${organization.id} is created`);

    return organization;
  }

  private async _createAvatar(youtubeChannelId: string) {
    const channel = await this._fetchChannelById(youtubeChannelId);
    const image = await fetch(channel.thumbnailUrl);
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const avatar = await this._mediaAttachmentRepository.save(
      new MediaAttachmentFilename(`${youtubeChannelId}_avatar.webp`),
      await sharp(imageBuffer).webp().toBuffer(),
    );

    // make color
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

    return { avatar, color: primaryColor };
  }

  private async _fetchChannelById(channelId: string) {
    try {
      const channel = await this._youtubeApiService.fetchChannel(channelId);
      return channel;
    } catch (error) {
      throw new CreateOrganizationChannelNotFoundError(channelId, error);
    }
  }
}
