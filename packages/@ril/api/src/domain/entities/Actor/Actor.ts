import { Entity, PrimitiveOf } from '../../_core';
import { Color, TwitterUsername } from '../../_shared';
import { MediaAttachment } from '../MediaAttachment';
import { ActorDescription } from './ActorDescription';
import { ActorId } from './ActorId';
import { ActorName } from './ActorName';

export interface ActorProps {
  readonly id: ActorId;
  readonly name: ActorName;
  readonly color: Color;
  readonly description?: ActorDescription;
  readonly avatar?: MediaAttachment;
  readonly twitterUsername?: TwitterUsername;
}

export abstract class Actor extends Entity<ActorId, ActorProps> {
  public constructor(props: ActorProps) {
    super(props);
  }

  public get id(): ActorId {
    return this._props.id;
  }

  public get name(): ActorName {
    return this._props.name;
  }

  public get color(): Color {
    return this._props.color;
  }

  public get description(): ActorDescription | undefined {
    return this._props.description;
  }

  public get avatar(): MediaAttachment | undefined {
    return this._props.avatar;
  }

  public get twitterUsername(): TwitterUsername | undefined {
    return this._props.twitterUsername;
  }

  public static createProps(props: PrimitiveOf<ActorProps>): ActorProps {
    return {
      id: new ActorId(props.id),
      name: new ActorName(props.name),
      color: Color.fromHex(props.color),
      description:
        props.description != null
          ? new ActorDescription(props.description)
          : undefined,
      avatar: props.avatar,
      twitterUsername:
        props.twitterUsername != null
          ? new TwitterUsername(props.twitterUsername)
          : undefined,
    };
  }
}
