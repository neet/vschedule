import { URL } from 'url';

import { RehydrateParameters } from '../../_core';
import { Color, TwitterUsername, YoutubeChannelId } from '../../_shared';
import { MediaAttachment } from '../MediaAttachment';
import { ActorDescription } from './ActorDescription';
import { ActorName } from './ActorName';

export interface ActorProps {
  readonly name: ActorName;
  readonly color: Color;
  readonly description: ActorDescription | null;
  readonly avatar: MediaAttachment | null;
  readonly url: URL | null;
  readonly twitterUsername: TwitterUsername | null;
  readonly youtubeChannelId: YoutubeChannelId | null;
}

export abstract class Actor {
  protected abstract readonly _props: ActorProps;

  public get name(): ActorName {
    return this._props.name;
  }

  public get color(): Color {
    return this._props.color;
  }

  public get url(): URL | null {
    return this._props.url;
  }

  public get description(): ActorDescription | null {
    return this._props.description;
  }

  public get avatar(): MediaAttachment | null {
    return this._props.avatar;
  }

  public get twitterUsername(): TwitterUsername | null {
    return this._props.twitterUsername;
  }

  public get youtubeChannelId(): YoutubeChannelId | null {
    return this._props.youtubeChannelId;
  }

  public static rehydrate(props: RehydrateParameters<ActorProps>): ActorProps {
    return {
      name: ActorName.from(props.name),
      color: props.color,
      description:
        props.description !== null
          ? ActorDescription.from(props.description)
          : null,
      avatar: props.avatar,
      url: props.url,
      youtubeChannelId:
        props.youtubeChannelId !== null
          ? YoutubeChannelId.from(props.youtubeChannelId)
          : null,
      twitterUsername:
        props.twitterUsername !== null
          ? TwitterUsername.from(props.twitterUsername)
          : null,
    };
  }

  public static create = Actor.rehydrate;
}
