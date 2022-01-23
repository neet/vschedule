import { Entity } from '../../utils';
import { TwitterUsername } from '..';
import { HexColor } from '../HexColor';
import { MediaAttachment } from '../MediaAttachment';
import { Organization } from '../Organization/Organization';
import { Uuid } from '../Uuid';
import { YoutubeChannelId } from '../YoutubeChannelId';
import { ActorDescription } from './ActorDescription';
import { ActorName } from './ActorName';

export interface ActorProps {
  readonly id: Uuid;
  readonly name: ActorName;
  readonly color: HexColor;
  readonly description?: ActorDescription;
  readonly avatar?: MediaAttachment;
  readonly organization?: Organization;
  readonly youtubeChannelId: YoutubeChannelId;
  readonly twitterUsername?: TwitterUsername;
}

export class Actor extends Entity<ActorProps> {
  public static from(props: ActorProps): Actor {
    return new Actor(props);
  }

  public get id(): string {
    return this._props.id.valueOf();
  }

  public get name(): string {
    return this._props.name.valueOf();
  }

  public get color(): string {
    return this._props.color.valueOf();
  }

  public get description(): string | undefined {
    return this._props.description?.valueOf();
  }

  public get avatar(): MediaAttachment | undefined {
    return this._props.avatar;
  }

  public get organization(): Organization | undefined {
    return this._props.organization;
  }

  public get youtubeChannelId(): string {
    return this._props.youtubeChannelId.valueOf();
  }

  public get twitterUsername(): string | undefined {
    return this._props.twitterUsername?.valueOf();
  }
}
