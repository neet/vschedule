import { Response } from 'express';
import { inject, injectable } from 'inversify';
import {
  Body,
  Controller,
  Get,
  OnUndefined,
  Post,
  QueryParams,
  Res,
  UseBefore,
} from 'routing-controllers';

import { RemoveStream, UpsertStream } from '../../../app';
import { VerifyYoutubeChannelSubscription } from '../../../app/channel';
import { Methods } from '../../generated/websub/youtube';

@injectable()
@Controller('/websub/youtube')
export class YoutubeWebsubController {
  constructor(
    @inject(UpsertStream)
    private readonly _upsertStream: UpsertStream,

    @inject(RemoveStream)
    private readonly _removeStream: RemoveStream,

    @inject(VerifyYoutubeChannelSubscription)
    private readonly _verifyChannelSubscription: VerifyYoutubeChannelSubscription,
  ) {}

  @Get('/')
  async verify(
    @Res() res: Response,
    @QueryParams() query: Methods['get']['query'],
  ) {
    // TODO: Unsubscribeのときのハンドリング
    await this._verifyChannelSubscription.invoke({
      topic: query['hub.topic'],
      leaseSeconds: query['hub.lease_seconds'],
    });

    return res.send(query['hub.challenge']);
  }

  @Post('/')
  @UseBefore()
  @OnUndefined(200)
  async notify(@Body() body: Required<Methods['post']['reqBody']>) {
    if (
      'at:deleted-entry' in body.feed &&
      body.feed['at:deleted-entry']?.[0]?.link?.[0]?.$?.href != null
    ) {
      const href = body.feed['at:deleted-entry'][0].link[0].$.href;
      if (href == null) {
        return;
      }

      await this._removeStream.invoke({ url: href });
    }

    if ('entry' in body.feed && body.feed.entry != null) {
      const videoId = body.feed.entry[0]?.['yt:videoId']?.[0];
      if (videoId == null) {
        return;
      }
      await this._upsertStream.invoke({ videoId });
      return;
    }
  }
}
