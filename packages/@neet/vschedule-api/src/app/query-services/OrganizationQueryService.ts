import { OrganizationId } from '../../domain/entities';
import { OrganizationDto } from './dto';

export interface OrganizationQueryManyParams {
  readonly limit?: number;
}

export interface IOrganizationQueryService {
  query(id: OrganizationId): Promise<OrganizationDto | undefined>;
  queryMany(params: OrganizationQueryManyParams): Promise<OrganizationDto[]>;
}
