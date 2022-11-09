import { Mixin } from 'ts-mixer';

import { Entity, Recipe } from '../../_core';
import { ITimestamps, TimestampMixin, Timestamps } from '../../_shared';
import { Actor, ActorProps } from '../Actor';
import { OrganizationId } from '../Organization';
import { BranchId } from './BranchId';

export interface BranchProps extends ActorProps {
  readonly id: BranchId;
  readonly organizationId: OrganizationId;
  readonly timestamps: Timestamps;
}

type Derivable = 'id' | 'timestamps';
const mixins = Mixin(Actor, Entity<BranchId, BranchProps>, TimestampMixin);

export class Branch extends mixins implements ITimestamps {
  get id() {
    return this._props.id;
  }

  get organizationId() {
    return this._props.organizationId;
  }

  public static create(props: Omit<Recipe<BranchProps>, Derivable>): Branch {
    return Branch.rehydrate({
      ...props,
      id: new BranchId(),
      timestamps: new Timestamps(),
    });
  }

  public static rehydrate(props: Recipe<BranchProps>): Branch {
    return new Branch({
      ...Actor.rehydrate(props),
      id: new BranchId(props.id),
      organizationId: new OrganizationId(props.organizationId),
      timestamps: props.timestamps,
    });
  }
}
