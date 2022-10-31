import {
  Parameter$listOrganizations,
  RequestBody$createOrganization,
} from '@ril/api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import { CreateOrganization } from '../../../../app/use-cases/CreateOrganization';
import { ListOrganization } from '../../../../app/use-cases/ListOrganizations';
import { ShowOrganization } from '../../../../app/use-cases/ShowOrganization';
import { RestApiPresenter } from '../../../mappers/RestApiMapper';

@controller('/api/v1/organizations')
export class OrganizationsController extends BaseHttpController {
  public constructor(
    @inject(ShowOrganization)
    private readonly _showOrganization: ShowOrganization,

    @inject(CreateOrganization)
    private readonly _createOrganization: CreateOrganization,

    @inject(ListOrganization)
    private readonly _listOrganization: ListOrganization,

    @inject(RestApiPresenter)
    private readonly _presenter: RestApiPresenter,
  ) {
    super();
  }

  @httpGet('/:organizationId')
  async show(@requestParam('organizationId') organizationId: string) {
    const organization = await this._showOrganization.invoke(organizationId);
    return this.json(this._presenter.presentActor(organization));
  }

  @httpGet('/')
  async list(@requestParam() params: Parameter$listOrganizations) {
    const organizations = await this._listOrganization.invoke({
      limit: params.limit,
      offset: params.offset,
    });

    return this.json(
      organizations.map((organization) =>
        this._presenter.presentActor(organization),
      ),
    );
  }

  @httpPost('/')
  async create(
    @requestBody() body: RequestBody$createOrganization['application/json'],
  ) {
    const organization = await this._createOrganization.invoke({
      name: body.name,
      url: body.url,
      description: body.description,
      color: body.color,
      youtubeChannelId: body.youtubeChannelId,
      twitterUsername: body.twitterUsername,
    });

    return this.json(this._presenter.presentActor(organization));
  }
}
