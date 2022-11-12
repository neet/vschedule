import { YoutubeChannelId } from '../_shared';
import { Organization, OrganizationId, PerformerId } from '../entities';

export interface FindOrganizationParams {
  readonly limit?: number;
  readonly offset?: number;
}

export interface IOrganizationRepository {
  create(organization: Organization): Promise<Organization>;
  update(organization: Organization): Promise<Organization>;
  find(params?: FindOrganizationParams): Promise<Organization[]>;
  findById(id: OrganizationId): Promise<Organization | null>;
  findByPerformerId(id: PerformerId): Promise<Organization | null>;
  findByYoutubeChannelId(id: YoutubeChannelId): Promise<Organization | null>;
}
