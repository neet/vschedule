import { Dayjs } from 'dayjs';
import { Mixin } from 'ts-mixer';

import { Entity, PrimitiveOf } from '../../_core';
import { ITimestamped } from '../../_shared/Timestamped';
import { Actor, IActor } from '../Actor';
import { OrganizationId } from './OrganizationId';

export interface IOrganization extends IActor, ITimestamped {
  readonly id: OrganizationId;
}

const mixins = Mixin(Actor, Entity<OrganizationId, IOrganization>);

export class Organization extends mixins implements IOrganization {
  get createdAt(): Dayjs {
    return this._props.createdAt;
  }

  get updatedAt(): Dayjs {
    return this._props.updatedAt;
  }

  public static fromPrimitive(props: PrimitiveOf<IOrganization>): Organization {
    return new Organization({
      ...Actor.fromPrimitive(props),
      id: new OrganizationId(props.id),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }
}
