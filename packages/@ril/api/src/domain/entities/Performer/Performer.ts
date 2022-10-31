import { castDraft, produce } from 'immer';
import { Mixin } from 'ts-mixer';

import { Entity, PrimitiveOf } from '../../_core';
import { Actor, ActorId, IActor } from '../Actor';

export interface IPerformer extends IActor {
  readonly organizationId?: ActorId;
}

const mixins = Mixin(Actor, Entity<ActorId, IPerformer>);

export class Performer extends mixins implements IPerformer {
  public get organizationId(): ActorId | undefined {
    return this._props.organizationId;
  }

  public update(patch: Partial<PrimitiveOf<IPerformer>>) {
    const updated = produce(this.toPrimitive(), (props) => {
      Object.entries(patch).forEach(([key, value]) => {
        if (value != null) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (props as any)[key] = castDraft(value);
        }
      });
    });
    return Performer.fromPrimitive(updated);
  }

  public static fromPrimitive(props: PrimitiveOf<IPerformer>) {
    return new Performer({
      ...Actor.createProps(props),
      organizationId:
        props.organizationId != null
          ? new ActorId(props.organizationId)
          : undefined,
    });
  }
}
