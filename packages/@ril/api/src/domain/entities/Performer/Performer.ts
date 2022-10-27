import { Mixin } from 'ts-mixer';

import { Entity, PrimitiveOf } from '../../_core';
import { YoutubeChannelId } from '../../_shared';
import { Actor, ActorId, ActorProps } from '../Actor';

export interface PerformerProps extends ActorProps {
  readonly youtubeChannelId: YoutubeChannelId;
}

const mixins = Mixin(Actor, Entity<ActorId, PerformerProps>);

export class Performer extends mixins {
  public get youtubeChannelId(): YoutubeChannelId {
    return this._props.youtubeChannelId;
  }

  public static fromPrimitive(props: PrimitiveOf<PerformerProps>) {
    return new Performer({
      ...Actor.createProps(props),
      youtubeChannelId: new YoutubeChannelId(props.youtubeChannelId),
    });
  }
}
