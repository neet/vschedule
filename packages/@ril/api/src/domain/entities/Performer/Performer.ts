import { castDraft, produce } from 'immer';
import { Mixin } from 'ts-mixer';

import { Entity, RehydrateParameters } from '../../_core';
import {
  ITimestamps,
  TimestampMixin,
  Timestamps,
} from '../../_shared/Timestamps';
import { Actor, ActorProps } from '../Actor';
import { OrganizationId } from '../Organization';
import { PerformerId } from './PerformerId';

export interface PerformerProps extends ActorProps {
  readonly id: PerformerId;
  readonly timestamps: Timestamps;
  readonly organizationId: OrganizationId | null;
}

const mixins = Mixin(
  Entity<PerformerId, PerformerProps>,
  Actor,
  TimestampMixin,
);

export class Performer extends mixins implements ITimestamps {
  public get organizationId(): OrganizationId | null {
    return this._props.organizationId;
  }

  public update(patch: Partial<RehydrateParameters<this>>) {
    const updated = produce(this._props, (draft) => {
      Object.entries(patch).forEach(([key, value]) => {
        if (value !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (draft as any)[key] = castDraft(value);
        }
      });
      draft.timestamps = draft.timestamps.update();
    });
    return Performer.rehydrate(updated);
  }

  public static rehydrate(props: RehydrateParameters<PerformerProps>) {
    return new Performer({
      ...Actor.rehydrate(props),
      id: PerformerId.from(props.id),
      timestamps: props.timestamps,
      organizationId:
        props.organizationId !== null
          ? OrganizationId.from(props.organizationId)
          : null,
    });
  }

  public static create(
    props: Omit<RehydrateParameters<PerformerProps>, 'id' | 'timestamps'>,
  ) {
    return Performer.rehydrate({
      // ...Actor.create(props),
      ...props,
      id: PerformerId.create(),
      timestamps: Timestamps.create(),
    });
  }
}
