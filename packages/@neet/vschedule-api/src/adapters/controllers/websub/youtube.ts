import { Response } from 'express';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  queryParam,
  requestBody,
  response,
} from 'inversify-express-utils';

import {
  CreateResubscriptionTask,
  RemoveStream,
  UpsertStream,
} from '../../../app';
import { TYPES } from '../../../types';
import { Methods } from '../../generated/websub/youtube';

@controller('/websub/youtube')
export class YoutubeWebsubController extends BaseHttpController {
  constructor(
    @inject(UpsertStream)
    private readonly _upsertStream: UpsertStream,

    @inject(RemoveStream)
    private readonly _removeStream: RemoveStream,

    @inject(CreateResubscriptionTask)
    private readonly _createResubscriptionTask: CreateResubscriptionTask,
  ) {
    super();
  }

  @httpGet('/')
  async verify(
    @response() res: Response,
    @queryParam() params: Methods['get']['query'],
  ) {
    // TODO: Unsubscribeのときのハンドリング
    await this._createResubscriptionTask.invoke({
      topic: params['hub.topic'],
      verifyToken: params['hub.verify_token'],
      leaseSeconds: params['hub.lease_seconds'],
    });

    return res.send(params['hub.challenge']);
  }

  @httpPost('/', TYPES.YoutubeWebsubParser)
  async notify(
    @requestBody()
    body: Required<Methods['post']['reqBody']>,
  ) {
    if (
      'at:deleted-entry' in body.feed &&
      body.feed['at:deleted-entry']?.[0]?.link?.[0]?.$?.href != null
    ) {
      const href = body.feed['at:deleted-entry'][0].link[0].$.href;
      if (href == null) {
        return this.statusCode(200);
      }

      await this._removeStream.invoke({ url: href });
      return this.statusCode(200);
    }

    if ('entry' in body.feed && body.feed.entry != null) {
      const videoId = body.feed.entry[0]?.['yt:videoId']?.[0];
      if (videoId == null) {
        return this.statusCode(200);
      }
      await this._upsertStream.invoke({ videoId });
      return this.statusCode(200);
    }

    return this.statusCode(200);
  }
}
