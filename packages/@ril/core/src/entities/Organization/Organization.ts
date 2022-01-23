import { Entity } from '../../utils';
import { MediaAttachment } from '../MediaAttachment';
import { TwitterUsername } from '../TwitterUsername';
import { Url } from '../Url';
import { Uuid } from '../Uuid';
import { OrganizationName } from './OrganizationName';

export interface OrganizationProps {
  readonly id: Uuid;
  readonly name: OrganizationName;
  readonly url: Url;
  readonly avatar?: MediaAttachment;
  readonly twitterUsername?: TwitterUsername;
}

export class Organization extends Entity<OrganizationProps> {
  public static from(props: OrganizationProps): Organization {
    return new Organization(props);
  }

  public get id(): string {
    return this._props.id.valueOf();
  }

  public get name(): string {
    return this._props.name.valueOf();
  }

  public get url(): string {
    return this._props.url.valueOf();
  }

  public get avatar(): MediaAttachment | undefined {
    return this._props.avatar;
  }

  public get twitterUsername(): string | undefined {
    return this._props.twitterUsername?.valueOf();
  }
}
