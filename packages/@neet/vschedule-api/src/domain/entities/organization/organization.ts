import Color from 'color';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { Mixin } from 'ts-mixer';

import { AggregateRoot, RehydrateParameters } from '../../_core';
import {
  ITimestamps,
  TimestampMixin,
  Timestamps,
  TwitterUsername,
  YoutubeChannelId,
} from '../_shared';
import { MediaAttachment } from '../media-attachment';
import { OrganizationDescription } from './organization-description';
import { OrganizationId } from './organization-id';
import { OrganizationName } from './organization-name';

export type OrganizationProps = {
  readonly id: OrganizationId;
  readonly name: OrganizationName;
  readonly color: Color;
  readonly url: URL | null;
  readonly description: OrganizationDescription | null;
  readonly avatar: MediaAttachment | null;
  readonly twitterUsername: TwitterUsername | null;
  readonly youtubeChannelId: YoutubeChannelId | null;
  readonly timestamps: Timestamps;
};

const mixins = Mixin(
  AggregateRoot<OrganizationId, OrganizationProps>,
  TimestampMixin,
);

export class Organization extends mixins implements ITimestamps {
  public get id(): OrganizationId {
    return this._props.id;
  }

  public get name(): OrganizationName {
    return this._props.name;
  }

  public get color(): Color {
    return this._props.color;
  }

  public get url(): URL | null {
    return this._props.url;
  }

  public get description(): OrganizationDescription | null {
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

  setName(name: OrganizationName) {
    const props = produce(this._props, (draft) => {
      draft.name = name;
      draft.timestamps = draft.timestamps.update();
    });
    return new Organization(props);
  }

  setDescription(description: OrganizationDescription | null) {
    const props = produce(this._props, (draft) => {
      draft.description = description;
      draft.timestamps = draft.timestamps.update();
    });
    return new Organization(props);
  }

  setUrl(url: URL | null) {
    const props = produce(this._props, (draft) => {
      draft.url = url;
      draft.timestamps = draft.timestamps.update();
    });
    return new Organization(props);
  }

  setYoutubeChannelId(id: YoutubeChannelId) {
    const props = produce(this._props, (draft) => {
      draft.youtubeChannelId = id;
      draft.timestamps = draft.timestamps.update();
    });
    return new Organization(props);
  }

  setTwitterUsername(username: TwitterUsername | null) {
    const props = produce(this._props, (draft) => {
      draft.twitterUsername = username;
      draft.timestamps = draft.timestamps.update();
    });
    return new Organization(props);
  }

  setColor(color: Color) {
    const props = produce(this._props, (draft) => {
      draft.color = color;
      draft.timestamps = draft.timestamps.update();
    });
    return new Organization(props);
  }

  public static create(
    props: Omit<RehydrateParameters<OrganizationProps>, 'id' | 'timestamps'>,
  ): Organization {
    return Organization.rehydrate({
      ...props,
      id: new OrganizationId(nanoid()),
      timestamps: new Timestamps(),
    });
  }

  public static rehydrate(
    props: RehydrateParameters<OrganizationProps>,
  ): Organization {
    return new Organization({
      id: new OrganizationId(props.id),
      name: new OrganizationName(props.name),
      color: props.color,
      description:
        props.description !== null
          ? new OrganizationDescription(props.description)
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
      timestamps: props.timestamps,
    });
  }
}
