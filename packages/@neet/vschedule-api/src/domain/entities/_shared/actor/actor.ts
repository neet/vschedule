import Color from 'color';
import { URL } from 'url';

import { RehydrateParameters } from '../../../_core';
import { TwitterUsername, YoutubeChannelId } from '..';
import { MediaAttachment } from '../../media-attachment';
import { ActorDescription } from './actor-description';
import { ActorName } from './actor-name';

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
      name: new ActorName(props.name),
      color: props.color,
      description:
        props.description !== null
          ? new ActorDescription(props.description)
          : null,
      avatar: props.avatar,
      url: props.url,
      youtubeChannelId:
        props.youtubeChannelId !== null
          ? new YoutubeChannelId(props.youtubeChannelId)
          : null,
      twitterUsername:
        props.twitterUsername !== null
          ? new TwitterUsername(props.twitterUsername)
          : null,
    };
  }

  public static create = Actor.rehydrate;
}
