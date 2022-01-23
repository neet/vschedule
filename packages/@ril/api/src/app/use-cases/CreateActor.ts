import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import * as uuid from 'uuid';
import {
  Actor,
  ActorDescription,
  ActorName,
  HexColor,
  TwitterUsername,
  Uuid,
  YoutubeChannelId,
} from '@ril/core';

import { TYPES } from '../../types';
import { ActorRepository } from '../repositories/ActorRepository';
import { MediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { YoutubeStreamService } from '../services/YoutubeStreamService';

export interface CreateActorParams {
  readonly youtubeChannelId: string;
  readonly twitterUsername: string;
  readonly name?: string;
  readonly description?: string;
  readonly color?: string;
  readonly webHubEnabled: boolean;
}

@injectable()
export class CreateActor {
  constructor(
    @inject(TYPES.ActorRepository)
    private readonly _actorRepository: ActorRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: MediaAttachmentRepository,

    @inject(TYPES.YoutubeStreamService)
    private readonly _youtubeStreamService: YoutubeStreamService,
  ) {}

  public async invoke(params: CreateActorParams): Promise<void> {
    const {
      name,
      youtubeChannelId,
      description,
      twitterUsername,
      webHubEnabled,
    } = params;

    const channel = await this._youtubeStreamService.fetchChannel(
      youtubeChannelId,
    );

    const image = await fetch(channel.thumbnailUrl);
    const imageBuffer = await image.buffer();

    // make color
    const shade = await getColors(
      imageBuffer,
      image.headers.get('Content-Type') as string,
    );
    const primaryColor = shade[0];
    if (primaryColor == null) {
      throw new Error('Could not find primary color');
    }

    const avatar = await this._mediaAttachmentRepository.save(
      `${uuid.v4()}.png`,
      await sharp(imageBuffer).png().toBuffer(),
    );

    const actor = Actor.from({
      id: Uuid.from(uuid.v4()),
      name: ActorName.from(name ?? channel.name),
      description:
        description != null ? ActorDescription.from(description) : undefined,
      color: HexColor.from(primaryColor.hex()),
      youtubeChannelId: YoutubeChannelId.from(youtubeChannelId),
      twitterUsername:
        twitterUsername != null
          ? TwitterUsername.from(twitterUsername)
          : undefined,
      avatar,
    });

    await this._actorRepository.save(actor);
    if (webHubEnabled) {
      await this._youtubeStreamService.subscribeToChannel(youtubeChannelId);
    }
  }
}
