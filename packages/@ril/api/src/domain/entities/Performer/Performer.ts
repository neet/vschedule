import { castDraft, produce } from 'immer';
import { Mixin } from 'ts-mixer';

import { Entity, PrimitiveOf } from '../../_core';
import { Actor, IActor } from '../Actor';
import { OrganizationId } from '../Organization';
import { PerformerId } from './PerformerId';

export interface IPerformer extends IActor {
  readonly id: PerformerId;
  readonly organizationId?: OrganizationId;
}

const mixins = Mixin(Actor, Entity<PerformerId, IPerformer>);
export class Performer extends mixins implements IPerformer {
  public get organizationId(): OrganizationId | undefined {
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
      ...Actor.fromPrimitive(props),
      id: new PerformerId(props.id),
      organizationId:
        props.organizationId != null
          ? new OrganizationId(props.organizationId)
          : undefined,
    });
  }
}
