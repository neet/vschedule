import {
  Parameter$verifyYoutubeWebsub,
  RequestBody$notifyYoutubeWebsub,
} from '@neet/vschedule-api-client';
import { Request, Response, Router } from 'express';

import { CreateResubscriptionTask } from '../../../modules/resubscription-tasks';
import { CreateStream, RemoveStream } from '../../../modules/streams';
import { Controller } from '../controller';

export class YoutubeWebsubController implements Controller {
  constructor(
    private readonly _createStream: CreateStream,
    private readonly _removeStream: RemoveStream,
    private readonly _createResubscriptionTask: CreateResubscriptionTask,
  ) {}

  register(): Router {
    const router = Router();
    router.get('/websub/youtube', this.verify);
    router.post('/websub/youtube', this.notify);
    return router;
  }

  async verify(req: Request<Parameter$verifyYoutubeWebsub>, res: Response) {
    // TODO: Unsubscribeのときのハンドリング
    await this._createResubscriptionTask.invoke({
      topic: req.params['hub.topic'],
      verifyToken: req.params['hub.verify_token'],
      leaseSeconds: req.params['hub.lease_seconds'],
    });

    return res.send(req.params['hub.challenge']);
  }

  async notify(
    req: Request<
      never,
      never,
      RequestBody$notifyYoutubeWebsub['application/atom+xml']
    >,
    res: Response,
  ) {
    if (
      'at:deleted-entry' in req.body.feed &&
      req.body.feed['at:deleted-entry']?.[0]?.link?.[0]?.$?.href != null
    ) {
      const href = req.body.feed['at:deleted-entry'][0].link[0].$.href;
      if (href == null) {
        return res.status(200);
      }

      await this._removeStream.invoke({ url: href });
      return res.status(200);
    }

    if ('entry' in req.body.feed && req.body.feed.entry != null) {
      const videoId = req.body.feed.entry[0]?.['yt:videoId']?.[0];
      if (videoId == null) {
        return res.status(200);
      }
      await this._createStream.invoke({ videoId });
      return res.status(200);
    }

    return res.status(200);
  }
}
