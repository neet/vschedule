import {
  Params$createOrganization,
  Params$listOrganizations,
  Params$showOrganization,
  Response$createOrganization$Status$200,
  Response$listOrganizations$Status$200,
  Response$showOrganization$Status$200,
} from '@neet/vschedule-api-client';
import { Request, Response, Router } from 'express';

import { RestPresenter } from '../../../../modules/_shared';
import {
  CreateOrganization,
  ListOrganization,
  ShowOrganization,
} from '../../../../modules/organizations';
import { Controller } from '../../controller';

export class OrganizationsRestController implements Controller {
  public constructor(
    private readonly _showOrganization: ShowOrganization,
    private readonly _createOrganization: CreateOrganization,
    private readonly _listOrganization: ListOrganization,
    private readonly _presenter: RestPresenter,
  ) {}

  register(): Router {
    const router = Router();
    router.get('/rest/v1/organizations', this.list);
    router.get('/rest/v1/organizations/:id', this.show);
    router.post('/rest/v1/organizations', this.create);
    return router;
  }

  show = async (
    req: Request<Params$showOrganization['parameter']>,
    res: Response<Response$showOrganization$Status$200['application/json']>,
  ) => {
    const organization = await this._showOrganization.invoke(
      req.params.organizationId,
    );

    return res
      .status(200)
      .json(this._presenter.presentOrganization(organization));
  };

  list = async (
    req: Request<Params$listOrganizations['parameter']>,
    res: Response<Response$listOrganizations$Status$200['application/json']>,
  ) => {
    const organizations = await this._listOrganization.invoke({
      limit: req.params.limit,
    });

    return res
      .status(200)
      .json(
        organizations.map((organization) =>
          this._presenter.presentOrganization(organization),
        ),
      );
  };

  create = async (
    req: Request<never, never, Params$createOrganization['requestBody']>,
    res: Response<Response$createOrganization$Status$200['application/json']>,
  ) => {
    const organization = await this._createOrganization.invoke({
      name: req.body.name,
      url: req.body.url ?? null,
      description: req.body.description ?? null,
      color: req.body.color ?? null,
      youtubeChannelId: req.body.youtubeChannelId ?? null,
      twitterUsername: req.body.twitterUsername ?? null,
    });

    return res
      .status(200)
      .json(this._presenter.presentOrganization(organization));
  };
}
