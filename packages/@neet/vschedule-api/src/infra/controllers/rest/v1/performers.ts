import {
  Parameter$listPerformers,
  Parameter$showPerformer,
  Parameter$subscribeToPerformer,
  Parameter$updatePerformer,
  RequestBody$createPerformer,
  RequestBody$updatePerformer,
  Response$listPerformers$Status$200,
  Response$showPerformer$Status$200,
  Response$updatePerformer$Status$200,
} from '@neet/vschedule-api-client';
import { Request, Response, Router } from 'express';

import { RestPresenter } from '../../../../modules/_shared/adapters/rest-presenter';
import {
  CreatePerformer,
  ListPerformers,
  ShowPerformer,
  SubscribeToPerformer,
  UpdatePerformer,
} from '../../../../modules/performers';
import { Controller } from '../../controller';

export class PerformersController implements Controller {
  constructor(
    private readonly _showPerformer: ShowPerformer,
    private readonly _updatePerformer: UpdatePerformer,
    private readonly _createPerformer: CreatePerformer,
    private readonly _listPerformers: ListPerformers,
    private readonly _subscribeToPerformer: SubscribeToPerformer,
    private readonly _presenter: RestPresenter,
  ) {}

  register() {
    const router = Router();
    router.post('/rest/v1/performer', this.update);
    router.patch('/rest/v1/performer/:performerId', this.update);
    router.get('/rest/v1/performer/:performerId', this.show);
    return router;
  }

  show = async (
    req: Request<Parameter$showPerformer>,
    res: Response<Response$showPerformer$Status$200['application/json']>,
  ) => {
    const performer = await this._showPerformer.invoke(req.params.performerId);

    if (performer == null) {
      // TODO: Add error types
      return res.status(400).json({
        message: `No performer found with ${req.params.performerId}`,
      } as any);
    }

    return res.status(200).json(this._presenter.presentPerformer(performer));
  };

  update = async (
    req: Request<
      Parameter$updatePerformer,
      never,
      RequestBody$updatePerformer['application/json']
    >,
    res: Response<Response$updatePerformer$Status$200['application/json']>,
  ) => {
    const performer = await this._updatePerformer.invoke(
      req.params.performerId,
      {
        name: req.body.name,
        color: req.body.color,
        description: req.body.description,
        youtubeChannelId: req.body.youtubeChannelId,
        twitterUsername: req.body.twitterUsername,
        organizationId: req.body.organizationId,
      },
    );

    return res.status(200).json(this._presenter.presentPerformer(performer));
  };

  subscribe = async (
    req: Request<Parameter$subscribeToPerformer>,
    res: Response,
  ) => {
    await this._subscribeToPerformer.invoke({
      performerId: req.params.performerId,
    });

    return res.status(202);
  };

  async list(
    req: Request<Parameter$listPerformers>,
    res: Response<Response$listPerformers$Status$200['application/json']>,
  ) {
    const performers = await this._listPerformers.invoke({
      limit: req.params.limit,
    });

    return res
      .status(200)
      .json(
        performers.map((performer) =>
          this._presenter.presentPerformer(performer),
        ),
      );
  }

  async create(
    req: Request<never, never, RequestBody$createPerformer['application/json']>,
    res: Response,
  ) {
    const performer = await this._createPerformer.invoke({
      youtubeChannelId: req.body.youtubeChannelId,
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
      twitterUsername: req.body.twitterUsername,
      url: req.body.url,
      organizationId: req.body.organizationId,
    });

    return res.status(201).json(this._presenter.presentPerformer(performer));
  }
}
