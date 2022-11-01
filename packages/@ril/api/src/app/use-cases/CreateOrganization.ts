import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { URL } from 'url';

import { Color } from '../../domain/_shared';
import { MediaAttachmentFilename, Organization } from '../../domain/entities';
import { TYPES } from '../../types';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IYoutubeApiService } from '../services/YoutubeApiService';

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
          ? Color.fromHex(color)
          : r?.color != null
          ? Color.fromHex(r?.color.hex())
          : Color.fromHex('#000000'),
      avatar: r?.avatar ?? null,
      youtubeChannelId,
      twitterUsername,
    });

    await this._organizationRepository.create(organization);
    return organization;
  }

  private async _createAvatar(youtubeChannelId: string) {
    const channel = await this._youtubeApiService.fetchChannel(
      youtubeChannelId,
    );
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
      throw new Error('Could not find primary color');
    }

    return { avatar, color: primaryColor };
  }
}
