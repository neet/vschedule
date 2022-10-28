import { Mixin } from 'ts-mixer';

import { Entity, PrimitiveOf } from '../../_core';
import { Actor, ActorId, IActor } from '../Actor';

export type IOrganization = IActor;

const mixins = Mixin(Actor, Entity<ActorId, IOrganization>);

export class Organization extends mixins implements IOrganization {
  public static fromPrimitive(props: PrimitiveOf<IOrganization>): Organization {
    return new Organization({
      ...Actor.createProps(props),
      url: props.url,
    });
  }
}
