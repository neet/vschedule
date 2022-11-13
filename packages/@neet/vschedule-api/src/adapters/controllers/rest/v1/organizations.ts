import {
  Parameter$listOrganizations,
  RequestBody$createOrganization,
} from '@neet/vschedule-api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  queryParam,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import { CreateOrganization } from '../../../../app/use-cases/organization/CreateOrganization';
import { ListOrganization } from '../../../../app/use-cases/organization/ListOrganizations';
import { ShowOrganization } from '../../../../app/use-cases/organization/ShowOrganization';
import { TYPES } from '../../../../types';
import { RestPresenter } from '../../../mappers/RestApiMapper';

@controller('/rest/v1/organizations')
export class OrganizationsController extends BaseHttpController {
  public constructor(
    @inject(ShowOrganization)
    private readonly _showOrganization: ShowOrganization,

    @inject(CreateOrganization)
    private readonly _createOrganization: CreateOrganization,

    @inject(ListOrganization)
    private readonly _listOrganization: ListOrganization,

    @inject(RestPresenter)
    private readonly _presenter: RestPresenter,
  ) {
    super();
  }

  @httpGet('/:organizationId')
  async show(@queryParam('organizationId') organizationId: string) {
    const organization = await this._showOrganization.invoke(organizationId);
    return this.json(this._presenter.presentOrganization(organization));
  }

  @httpGet('/')
  async list(@requestParam() params: Parameter$listOrganizations) {
    const organizations = await this._listOrganization.invoke({
      limit: params.limit,
      offset: params.offset,
    });

    return this.json(
      organizations.map((organization) =>
        this._presenter.presentOrganization(organization),
      ),
    );
  }

  @httpPost('/', TYPES.Authenticated)
  async create(
    @requestBody() body: RequestBody$createOrganization['application/json'],
  ) {
    const organization = await this._createOrganization.invoke({
      name: body.name,
      url: body.url ?? null,
      description: body.description ?? null,
      color: body.color ?? null,
      youtubeChannelId: body.youtubeChannelId ?? null,
      twitterUsername: body.twitterUsername ?? null,
    });

    return this.json(this._presenter.presentOrganization(organization));
  }
}
