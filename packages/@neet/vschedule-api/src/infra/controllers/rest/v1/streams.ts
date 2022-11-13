import {
  Parameter$listStreams,
  Parameter$showStream,
  Response$listStreams$Status$200,
  Response$showStream$Status$200,
} from '@neet/vschedule-api-client';
import { Request, Response, Router } from 'express';

import { RestPresenter } from '../../../../modules/_shared';
import { ListStreams, ShowStream } from '../../../../modules/streams';
import { Controller } from '../../controller';

export class StreamsController implements Controller {
  constructor(
    private readonly _listStreams: ListStreams,
    private readonly _showStream: ShowStream,
    private readonly _presenter: RestPresenter,
  ) {}

  register(): Router {
    const router = Router();
    router.get('/rest/v1/streams', this.list);
    router.get('/rest/v1/streams/:streamId', this.show);
    return router;
  }

  show = async (
    req: Request<Parameter$showStream>,
    res: Response<Response$showStream$Status$200['application/json']>,
  ) => {
    const data = await this._showStream.invoke(req.params.streamId);

    if (data == null) {
      return res.status(404);
    }

    return res.status(200).json(this._presenter.presentStream(data));
  };

  list = async (
    req: Request<Parameter$listStreams>,
    res: Response<Response$listStreams$Status$200['application/json']>,
  ) => {
    const data = await this._listStreams.invoke({
      limit: req.params.limit,
      organizationId: req.params.organizationId,
    });

    return res.json(data.map((d) => this._presenter.presentStream(d)));
  };
}
