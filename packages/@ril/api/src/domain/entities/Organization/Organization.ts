import { Mixin } from 'ts-mixer';
import { URL } from 'url';

import { Entity, PrimitiveOf } from '../../_core';
import { Actor, ActorId, ActorProps } from '../Actor';

export interface OrganizationProps extends ActorProps {
  readonly url: URL;
}

const mixins = Mixin(Actor, Entity<ActorId, OrganizationProps>);

export class Organization extends mixins {
  public constructor(props: OrganizationProps) {
    super(props);
  }

  public get url(): URL {
    return this._props.url;
  }

  public static fromPrimitive(
    props: PrimitiveOf<OrganizationProps>,
  ): Organization {
    return new Organization({
      ...Actor.createProps(props),
      url: props.url,
    });
  }
}
