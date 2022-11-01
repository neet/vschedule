import { URL } from 'url';

import { PrimitiveOf } from '../../_core';
import { Color, TwitterUsername, YoutubeChannelId } from '../../_shared';
import { MediaAttachment } from '../MediaAttachment';
import { ActorDescription } from './ActorDescription';
import { ActorName } from './ActorName';

export interface IActor {
  readonly name: ActorName;
  readonly color: Color;
  readonly description?: ActorDescription;
  readonly avatar?: MediaAttachment;
  readonly url?: URL;
  readonly twitterUsername?: TwitterUsername;
  readonly youtubeChannelId?: YoutubeChannelId;
}

export abstract class Actor implements IActor {
  protected abstract readonly _props: IActor;

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

  public static fromPrimitive(props: PrimitiveOf<IActor>): IActor {
    return {
      name: new ActorName(props.name),
      color: Color.fromHex(props.color),
      description:
        props.description != null
          ? new ActorDescription(props.description)
          : undefined,
      avatar: props.avatar,
      youtubeChannelId:
        props.youtubeChannelId != null
          ? new YoutubeChannelId(props.youtubeChannelId)
          : undefined,
      twitterUsername:
        props.twitterUsername != null
          ? new TwitterUsername(props.twitterUsername)
          : undefined,
    };
  }
}
