import {
  YoutubeAtomFeed,
  YoutubeAtomFeedCreate,
  YoutubeAtomFeedDelete,
  YoutubeWebSubVerification,
} from '@ril/api-spec/request-bodies';
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
import { TypeOf } from 'zod';

import { RemoveStream } from '../../../app/use-cases/RemoveStream';
import { SaveYoutubeStream } from '../../../app/use-cases/SaveYoutubeStream';
import { VerifyYoutubeWebSubSubscription } from '../../../app/use-cases/VerifyYoutubeWebSubSubscription';

const isDeletion = (
  atom: TypeOf<typeof YoutubeAtomFeed>,
): atom is TypeOf<typeof YoutubeAtomFeedDelete> =>
  'at:deleted-entry' in atom.feed;

const isCreation = (
  atom: TypeOf<typeof YoutubeAtomFeed>,
): atom is TypeOf<typeof YoutubeAtomFeedCreate> => 'entry' in atom.feed;

@injectable()
@JsonController('/webhook/youtube')
export class YoutubeWebhookController {
  constructor(
    @inject(SaveYoutubeStream)
    private readonly _saveYoutubeStream: SaveYoutubeStream,

    @inject(RemoveStream)
    private readonly _removeStream: RemoveStream,

    @inject(VerifyYoutubeWebSubSubscription)
    private readonly _verifyYoutubeWebSubSubscription: VerifyYoutubeWebSubSubscription,
  ) {}

  @Get('/')
  async verify(@Params() params: TypeOf<typeof YoutubeWebSubVerification>) {
    await this._verifyYoutubeWebSubSubscription.invoke({
      topic: params['hub.topic'],
      leaseSeconds: params['hub.lease_seconds'],
    });

    return params['hub.challenge'];
  }

  @Post('/')
  async notify(
    @Body() body: TypeOf<typeof YoutubeAtomFeed>,
    @Res() res: Response,
  ) {
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
