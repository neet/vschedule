import { URL } from 'url';

import { RehydrateParameters } from '../../_core';
import { Color, TwitterUsername, YoutubeChannelId } from '../../_shared';
import { MediaAttachment } from '../MediaAttachment';
import { ActorDescription } from './ActorDescription';
import { ActorName } from './ActorName';

export interface ActorProps {
  readonly name: ActorName;
  readonly color: Color;
  readonly description?: ActorDescription;
  readonly avatar?: MediaAttachment;
  readonly url?: URL;
  readonly twitterUsername?: TwitterUsername;
  readonly youtubeChannelId?: YoutubeChannelId;
}

export abstract class Actor {
  protected abstract readonly _props: ActorProps;

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

  public static rehydrate(props: RehydrateParameters<ActorProps>): ActorProps {
    return {
      name: ActorName.from(props.name),
      color: props.color,
      description:
        props.description != null
          ? ActorDescription.from(props.description)
          : undefined,
      avatar: props.avatar,
      youtubeChannelId:
        props.youtubeChannelId != null
          ? YoutubeChannelId.from(props.youtubeChannelId)
          : undefined,
      twitterUsername:
        props.twitterUsername != null
          ? TwitterUsername.from(props.twitterUsername)
          : undefined,
    };
  }

  public static create = Actor.rehydrate;
}
