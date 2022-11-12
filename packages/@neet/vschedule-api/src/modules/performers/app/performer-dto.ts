import { Dayjs } from 'dayjs';

import { ActorDto } from '../../_shared/app';
import { OrganizationDto } from '../../organizations/app';
import { PerformerId } from '../domain';

export interface PerformerDto extends ActorDto {
  readonly id: PerformerId;
  readonly organization: OrganizationDto | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}
