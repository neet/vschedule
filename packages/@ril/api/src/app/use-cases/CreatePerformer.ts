import Color from 'color';
import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { URL } from 'url';

import {
  MediaAttachmentFilename,
  Organization,
  OrganizationId,
  Performer,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { ILogger } from '../services/Logger';
import { IYoutubeApiService } from '../services/YoutubeApiService';

export class CreatePerformerOrganizationNotFoundError extends AppError {
  public readonly name = 'CreatePerformerOrganizationNotFoundError';

  public constructor(public readonly organizationId: OrganizationId) {
    super(`No organization found with ID ${organizationId.value}`);
  }
}

export interface CreatePerformerParams {
  readonly youtubeChannelId: string;
  readonly url: string | null;
  readonly twitterUsername: string | null;
  readonly organizationId: string | null;

  /** @default string Generated from Youtube avatar  */
  readonly color?: string | null;
  /** @default string YouTube channel name  */
  readonly name?: string | null;
  /** @default string YouTube channel description  */
  readonly description?: string | null;
}

@injectable()
export class CreatePerformer {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,

    @inject(TYPES.YoutubeApiService)
    private readonly _youtubeApiService: IYoutubeApiService,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public async invoke(
    params: CreatePerformerParams,
  ): Promise<[Performer, Organization | null]> {
    const {
      name,
      youtubeChannelId,
      description,
      color,
      url,
      twitterUsername,
      organizationId,
    } = params;

    const organization = await this._fetchOrganization(organizationId);

    const channel = await this._youtubeApiService.fetchChannel(
      youtubeChannelId,
    );

    // image
    const image = await fetch(channel.thumbnailUrl);
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    // make color
    const shade = await getColors(
      imageBuffer,
      image.headers.get('Content-Type') as string,
    );
    const primaryColor = shade[0];
    if (primaryColor == null) {
      this._logger.warning('Could not find primary color');
      throw new UnexpectedError();
    }

    // トランザクション貼りたいけどどうしよう..
    const avatar = await this._mediaAttachmentRepository.save(
      new MediaAttachmentFilename(`${youtubeChannelId}_avatar.webp`),
      await sharp(imageBuffer).webp().toBuffer(),
    );

    const performer = Performer.create({
      name: name ?? channel.name,
      avatar,
      youtubeChannelId,
      description: description ?? channel.description ?? null,
      color: new Color(color ?? primaryColor.hex()),
      url: url != null ? new URL(url) : null,
      twitterUsername: twitterUsername ?? null,
      organizationId: organizationId ?? null,
    });

    await this._performerRepository.create(performer);
    this._logger.info('Performer with ID %s is created', performer.id);

    return [performer, organization ?? null];
  }

  private async _fetchOrganization(
    rawId?: string | null,
  ): Promise<Organization | null> {
    if (rawId == null) return null;
    const id = new OrganizationId(rawId);

    const org = this._organizationRepository.findById(id);
    if (org == null) {
      throw new CreatePerformerOrganizationNotFoundError(id);
    }

    return org;
  }
}
