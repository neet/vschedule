import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { PerformerDto } from '../dto';
import { IPerformerQueryService } from './performer-query-service';

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
