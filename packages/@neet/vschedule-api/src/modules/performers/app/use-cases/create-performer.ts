import assert from 'assert';
import Color from 'color';
import getColors from 'get-image-colors';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { URL } from 'url';

import { ILogger, IYoutubeApiService, UnexpectedError } from '../../../_shared';
import { AppError } from '../../../_shared/app/errors/app-error';
import { MediaAttachmentFilename } from '../../../media-attachments/domain';
import { IMediaAttachmentRepository } from '../../../media-attachments/domain/media-attachment-repository';
import { OrganizationId } from '../../../organizations/domain';
import { IOrganizationRepository } from '../../../organizations/domain/organization-repository';
import { Performer } from '../../domain';
import { IPerformerRepository } from '../../domain/performer-repository';
import { PerformerDto } from '../performer-dto';
import { IPerformerQueryService } from '../performer-query-service';

export class CreatePerformerChannelNotFoundError extends AppError {
  public readonly name = 'CreatePerformerChannelNotFoundError ';

  public constructor(
    public readonly channelId: string,
    public readonly cause: unknown,
  ) {
    super(`No channel found with ID ${channelId}`);
  }
}

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

export class CreatePerformer {
  constructor(
    private readonly _performerRepository: IPerformerRepository,
    private readonly _performerQueryService: IPerformerQueryService,
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,
    private readonly _youtubeApiService: IYoutubeApiService,
    private readonly _organizationRepository: IOrganizationRepository,
    private readonly _logger: ILogger,
  ) {}

  public async invoke(params: CreatePerformerParams): Promise<PerformerDto> {
    const {
      name,
      youtubeChannelId,
      description,
      color,
      url,
      twitterUsername,
      organizationId,
    } = params;

    const channel = await this._fetchChannelById(youtubeChannelId);
    if (organizationId != null) {
      await this._checkIfOrganizationExists(organizationId);
    }

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
    this._logger.info(`Performer with ID ${performer.id} is created`, {
      performer,
    });

    const dto = await this._performerQueryService.query(performer.id);
    assert(dto !== undefined);
    return dto;
  }

  private async _fetchChannelById(channelId: string) {
    try {
      const channel = await this._youtubeApiService.fetchChannel(channelId);
      return channel;
    } catch (error) {
      throw new CreatePerformerChannelNotFoundError(channelId, error);
    }
  }

  private async _checkIfOrganizationExists(rawId: string) {
    const id = new OrganizationId(rawId);
    const org = this._organizationRepository.findById(id);
    if (org == null) {
      throw new CreatePerformerOrganizationNotFoundError(id);
    }
  }
}
