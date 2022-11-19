import { inject, injectable } from 'inversify';

import { OrganizationId, YoutubeChannelId } from '../../domain';
import { TYPES } from '../../types';
import { AppError, UnexpectedError } from '../_shared';
import { OrganizationDto } from '../dto';
import { IOrganizationQueryService } from './organization-query-service';

export class ShowOrganizationNotFoundError extends AppError {
  public readonly name = 'ShowOrganizationNotFoundError';

  public constructor(public readonly id: OrganizationId) {
    super(`Organization with ID ${id} was not found`);
  }
}

export class ShowOrganizationYoutubeChannelIdNotFoundError extends AppError {
  public readonly name = 'ShowOrganizationNotFoundError';

  public constructor(public readonly id: YoutubeChannelId) {
    super(`Organization with YouTube Channel ID ${id} was not found`);
  }
}

export type ShowOrganizationCommand =
  | { readonly id: string }
  | { readonly youtubeChannelId: string };

@injectable()
export class ShowOrganization {
  constructor(
    @inject(TYPES.OrganizationQueryService)
    private readonly _organizationQueryService: IOrganizationQueryService,
  ) {}

  async invoke(command: ShowOrganizationCommand): Promise<OrganizationDto> {
    if ('id' in command) {
      const organizationId = new OrganizationId(command.id);
      const organization = await this._organizationQueryService.query(
        organizationId,
      );

      if (organization == null) {
        throw new ShowOrganizationNotFoundError(organizationId);
      }

      return organization;
    }

    if ('youtubeChannelId' in command) {
      const ytChannelId = new YoutubeChannelId(command.youtubeChannelId);
      const organization =
        await this._organizationQueryService.queryByYoutubeChannelId(
          ytChannelId,
        );

      if (organization == null) {
        throw new ShowOrganizationYoutubeChannelIdNotFoundError(ytChannelId);
      }

      return organization;
    }

    throw new UnexpectedError();
  }
}
