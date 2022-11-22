import { inject, injectable } from 'inversify';
import { Get, JsonController, Param, QueryParams } from 'routing-controllers';

import { ListOrganization, ShowOrganization } from '../../../../app';
import { Methods } from '../../../generated/rest/v1/organizations';
import { Methods as MethodsId } from '../../../generated/rest/v1/organizations/_organizationId@string';
import { RestPresenter } from '../../../mappers';

@injectable()
@JsonController()
export class OrganizationsController {
  public constructor(
    @inject(ShowOrganization)
    private readonly _showOrganization: ShowOrganization,

    @inject(ListOrganization)
    private readonly _listOrganization: ListOrganization,

    @inject(RestPresenter)
    private readonly _presenter: RestPresenter,
  ) {}

  @Get('/:organizationId')
  async show(
    @Param('organizationId') organizationId: string,
  ): Promise<MethodsId['get']['resBody']> {
    const organization = await this._showOrganization.invoke({
      id: organizationId,
    });
    return this._presenter.presentOrganization(organization);
  }

  @Get('/')
  async list(
    @QueryParams() query: Methods['get']['query'] = {},
  ): Promise<Methods['get']['resBody']> {
    const organizations = await this._listOrganization.invoke({
      limit: query.limit,
      offset: query.offset,
    });

    return organizations.map((organization) =>
      this._presenter.presentOrganization(organization),
    );
  }
}
