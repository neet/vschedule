import { OrganizationId } from '../../../organizations/domain';
import { StreamDto } from '../stream-dto';
import { IStreamQueryService } from '../stream-query-service';

export interface ListStreamsParams {
  readonly limit?: number;
  readonly organizationId?: string;
}

export class ListStreams {
  constructor(private readonly _streamQueryService: IStreamQueryService) {}

  async invoke(params: ListStreamsParams = {}): Promise<StreamDto[]> {
    return this._streamQueryService.queryMany({
      limit: params.limit,
      organizationId:
        params.organizationId != null
          ? new OrganizationId(params.organizationId)
          : undefined,
    });
  }
}
