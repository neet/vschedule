import { YoutubeChannelId } from '../../domain/_shared';
import { ActorId, Organization } from '../../domain/entities';

export interface FindOrganizationParams {
  readonly limit?: number;
  readonly offset?: number;
}

export interface IOrganizationRepository {
  save(organization: Organization): Promise<Organization>;
  find(params?: FindOrganizationParams): Promise<Organization[]>;
  findById(id: ActorId): Promise<Organization | null>;
  findByYoutubeChannelId(id: YoutubeChannelId): Promise<Organization | null>;
}
