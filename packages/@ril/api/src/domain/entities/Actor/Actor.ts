import { URL } from 'url';

import { Entity, PrimitiveOf } from '../../_core';
import { Color, TwitterUsername, YoutubeChannelId } from '../../_shared';
import { MediaAttachment } from '../MediaAttachment';
import { ActorDescription } from './ActorDescription';
import { ActorId } from './ActorId';
import { ActorName } from './ActorName';

export interface IActor {
  readonly id: ActorId;
  readonly name: ActorName;
  readonly color: Color;
  readonly description?: ActorDescription;
  readonly avatar?: MediaAttachment;
  readonly url?: URL;
  readonly twitterUsername?: TwitterUsername;
  readonly youtubeChannelId?: YoutubeChannelId;
}

export abstract class Actor extends Entity<ActorId, IActor> implements IActor {
  public constructor(props: IActor) {
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

  public get url(): URL | undefined {
    return this._props.url;
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

  public get youtubeChannelId(): YoutubeChannelId | undefined {
    return this._props.youtubeChannelId;
  }

  public static createProps(props: PrimitiveOf<IActor>): IActor {
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
