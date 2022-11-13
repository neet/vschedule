import { inject, injectable } from 'inversify';

import { TYPES } from '../../../types';
import { IPerformerQueryService, PerformerDto } from '../../query-services';

export interface ListPerformersParams {
  readonly limit?: number;
  readonly offset?: number;
}

@injectable()
export class ListPerformers {
  constructor(
    @inject(TYPES.PerformerQueryService)
    private readonly _performerQueryService: IPerformerQueryService,
  ) {}

  async invoke(params?: ListPerformersParams): Promise<PerformerDto[]> {
    const actors = await this._performerQueryService.queryMany({
      limit: params?.limit,
    });

    return actors;
  }
}
