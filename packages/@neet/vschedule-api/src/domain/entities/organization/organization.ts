import { Mixin } from 'ts-mixer';

import { AggregateRoot, RehydrateParameters } from '../../_core';
import {
  Actor,
  ActorProps,
  ITimestamps,
  TimestampMixin,
  Timestamps,
} from '../_shared';
import { OrganizationId } from './organization-id';

export interface OrganizationProps extends ActorProps {
  readonly id: OrganizationId;
  readonly timestamps: Timestamps;
}

const mixins = Mixin(
  AggregateRoot<OrganizationId, OrganizationProps>,
  Actor,
  TimestampMixin,
);

export class Organization extends mixins implements ITimestamps {
  public static create(
    props: Omit<RehydrateParameters<OrganizationProps>, 'id' | 'timestamps'>,
  ): Organization {
    return Organization.rehydrate({
      ...props,
      id: new OrganizationId(),
      timestamps: new Timestamps(),
    });
  }

  public static rehydrate(
    props: RehydrateParameters<OrganizationProps>,
  ): Organization {
    return new Organization({
      ...Actor.rehydrate(props),
      id: new OrganizationId(props.id),
      timestamps: props.timestamps,
    });
  }
}
