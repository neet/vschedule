import { Mixin } from 'ts-mixer';

import { Entity, RehydrateParameters } from '../../_core';
import {
  ITimestamps,
  TimestampMixin,
  Timestamps,
} from '../../_shared/Timestamps';
import { Actor, ActorProps } from '../Actor';
import { OrganizationId } from './OrganizationId';

export interface OrganizationProps extends ActorProps {
  readonly id: OrganizationId;
  readonly timestamps: Timestamps;
}

const mixins = Mixin(
  Actor,
  Entity<OrganizationId, OrganizationProps>,
  TimestampMixin,
);

export class Organization extends mixins implements ITimestamps {
  public static create(
    props: Omit<RehydrateParameters<OrganizationProps>, 'id' | 'timestamps'>,
  ): Organization {
    return Organization.rehydrate({
      ...props,
      id: OrganizationId.create(),
      timestamps: Timestamps.create(),
    });
  }

  public static rehydrate(
    props: RehydrateParameters<OrganizationProps>,
  ): Organization {
    return new Organization({
      ...Actor.rehydrate(props),
      id: OrganizationId.from(props.id),
      timestamps: props.timestamps,
    });
  }
}
