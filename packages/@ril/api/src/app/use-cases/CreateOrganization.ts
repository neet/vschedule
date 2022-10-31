import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { URL } from 'url';
import * as uuid from 'uuid';

import { MediaAttachmentFilename, Organization } from '../../domain/entities';
import { TYPES } from '../../types';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IYoutubeApiService } from '../services/YoutubeApiService';

export interface CreateOrganizationParams {
  readonly name: string;
  readonly url?: string;
  readonly description?: string;
  readonly color?: string;
  readonly youtubeChannelId?: string;
  readonly twitterUsername?: string;
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

    const r =
      youtubeChannelId != null
        ? await this._createAvatar(youtubeChannelId)
        : null;

    const organization = Organization.fromPrimitive({
      id: uuid.v4(),
      name,
      url: url != null ? new URL(url) : undefined,
      description: description === '' ? undefined : description,
      color: color ?? r?.color.hex() ?? '#000000',
      avatar: r?.avatar ?? undefined,
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
      new MediaAttachmentFilename(`${uuid.v4()}.webp`),
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
