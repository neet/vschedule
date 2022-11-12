import { Dayjs } from 'dayjs';

import { ActorDto } from '../../_shared/app';
import { OrganizationId } from '../domain';

export interface OrganizationDto extends ActorDto {
  readonly id: OrganizationId;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}
