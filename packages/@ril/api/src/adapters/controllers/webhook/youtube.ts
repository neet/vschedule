import { IsInt, IsString, IsUrl } from 'class-validator';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import {
  BadRequestError,
  Body,
  Get,
  JsonController,
  Params,
  Post,
  Res,
} from 'routing-controllers';

import { RemoveStream } from '../../../app/use-cases/RemoveStream';
import { SaveYoutubeStream } from '../../../app/use-cases/SaveYoutubeStream';
import { VerifyYoutubeWebHubSubscription } from '../../../app/use-cases/VerifyYoutubeWebHubSubscription';

interface XmlNamespace {
  readonly xmlns: string;
  readonly 'xmlns:at': string;
}

interface AtomEntry {
  readonly id: string[];
  readonly title: string[];
  readonly 'yt:videoId': string[];
  readonly 'yt:channelId': string[];
}

interface Link {
  readonly href: string;
}

interface YtEntryDeleted {
  readonly feed: {
    readonly $: XmlNamespace;
    readonly 'at:deleted-entry': readonly Link[];
  };
}

interface YtEntryCreated {
  readonly feed: {
    readonly $: XmlNamespace;
    readonly entry: AtomEntry[];
  };
}

type YtAtomFeed = YtEntryCreated | YtEntryDeleted;

const isDeletion = (atom: YtAtomFeed): atom is YtEntryDeleted =>
  'at:deleted-entry' in atom.feed;

const isCreation = (atom: YtAtomFeed): atom is YtEntryCreated =>
  'entry' in atom.feed;

export class Verification {
  @IsUrl()
  'hub.topic': string;

  @IsInt()
  'hub.challenge': number;

  @IsString()
  'hub.mode': 'subscribe' | 'unsubscribe';

  @IsInt()
  'hub.lease_seconds': number;
}

@injectable()
@JsonController('/webhook/youtube')
export class YoutubeWebhookController {
  constructor(
    @inject(SaveYoutubeStream)
    private readonly _saveYoutubeStream: SaveYoutubeStream,

    @inject(RemoveStream)
    private readonly _removeStream: RemoveStream,

    @inject(VerifyYoutubeWebHubSubscription)
    private readonly _verifyYoutubeWebHubSubscription: VerifyYoutubeWebHubSubscription,
  ) {}

  @Get('/')
  async verify(@Params() params: Verification) {
    await this._verifyYoutubeWebHubSubscription.invoke({
      topic: params['hub.topic'],
      leaseSeconds: params['hub.lease_seconds'],
    });

    return params['hub.challenge'];
  }

  @Post('/')
  async notify(@Body() body: YtAtomFeed, @Res() res: Response) {
    if (isDeletion(body) && body.feed['at:deleted-entry'].length > 0) {
      const href = body.feed['at:deleted-entry']?.[0]?.href;

      if (href == null) {
        throw new BadRequestError('error');
      }
      await this._removeStream.invoke({ url: href });
      return res.sendStatus(200);
    }

    if (isCreation(body) && body.feed.entry != null) {
      const videoId = body.feed.entry[0]?.['yt:videoId']?.[0];
      if (videoId == null) {
        throw new BadRequestError('error');
      }

      await this._saveYoutubeStream.invoke({
        videoId,
      });
      return res.sendStatus(200);
    }

    throw new BadRequestError('error');
  }
}
