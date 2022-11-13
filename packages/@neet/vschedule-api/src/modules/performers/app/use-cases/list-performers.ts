import { PerformerDto } from '../performer-dto';
import { IPerformerQueryService } from '../performer-query-service';

export interface ListPerformersParams {
  readonly limit?: number;
}

export class ListPerformers {
  constructor(
    private readonly _performerQueryService: IPerformerQueryService,
  ) {}

  async invoke(params?: ListPerformersParams): Promise<PerformerDto[]> {
    const performers = await this._performerQueryService.queryMany({
      limit: params?.limit,
    });

    return performers;
  }
}
