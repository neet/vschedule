import Color from 'color';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { Mixin } from 'ts-mixer';

import { AggregateRoot, RehydrateParameters } from '../../_core';
import {
  Actor,
  ActorDescription,
  ActorName,
  ActorProps,
  ITimestamps,
  TimestampMixin,
  Timestamps,
  TwitterUsername,
  YoutubeChannelId,
} from '../_shared';
import { OrganizationId } from './organization-id';

export interface OrganizationProps extends ActorProps {
  readonly id: OrganizationId;
  readonly timestamps: Timestamps;
}

const mixins = Mixin(
  AggregateRoot<OrganizationId, OrganizationProps>,
  Actor,
  TimestampMixin,
);

export class Organization extends mixins implements ITimestamps {
  setName(name: ActorName) {
    const props = produce(this._props, (draft) => {
      draft.name = name;
      draft.timestamps = draft.timestamps.update();
    });
    return new Organization(props);
  }

  setDescription(description: ActorDescription | null) {
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
      ...Actor.rehydrate(props),
      id: new OrganizationId(props.id),
      timestamps: props.timestamps,
    });
  }
}
