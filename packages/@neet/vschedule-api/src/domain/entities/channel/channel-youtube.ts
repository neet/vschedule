import { produce } from 'immer';
import { nanoid } from 'nanoid';

import { AggregateRoot } from '../../_core';
import { YoutubeChannelId } from '../_shared';
import { OrganizationId } from '../organization';
import { PerformerId } from '../performer';
import { IChannel } from './channel-base';
import { ChannelDescription } from './channel-description';
import { ChannelId } from './channel-id';
import { ChannelName } from './channel-name';
import { ChannelStatus } from './channel-status';

export type ChannelYoutubeProps = {
  readonly id: ChannelId;
  readonly name: ChannelName;
  readonly description: ChannelDescription | null;
  readonly status: ChannelStatus;
  readonly ownerId: OrganizationId | PerformerId;
  readonly youtubeChannelId: YoutubeChannelId;
};

const mixins = AggregateRoot<ChannelId, ChannelYoutubeProps>;

export class ChannelYoutube extends mixins implements IChannel {
  public get id(): ChannelId {
    return this._props.id;
  }

  public get name(): ChannelName {
    return this._props.name;
  }

  public get description(): ChannelDescription | null {
    return this._props.description;
  }

  public get status(): ChannelStatus {
    return this._props.status;
  }

  public get ownerId(): OrganizationId | PerformerId {
    return this._props.ownerId;
  }

  public get youtubeChannelId(): YoutubeChannelId {
    return this._props.youtubeChannelId;
  }

  public resetSubscription(): ChannelYoutube {
    const props = produce(this._props, (draft) => {
      draft.status = ChannelStatus.UNSET;
    });
    return new ChannelYoutube(props);
  }

  public requestSubscription(): ChannelYoutube {
    const props = produce(this._props, (draft) => {
      draft.status = ChannelStatus.REQUESTED;
    });
    return new ChannelYoutube(props);
  }

  public verifySubscription(): ChannelYoutube {
    const props = produce(this._props, (draft) => {
      draft.status = ChannelStatus.VERIFIED;
    });
    return new ChannelYoutube(props);
  }

  public canSubscribe(): boolean {
    return this._props.status === ChannelStatus.UNSET;
  }

  public isRequested(): boolean {
    return this._props.status === ChannelStatus.REQUESTED;
  }

  public static create(props: Omit<ChannelYoutubeProps, 'id'>) {
    return new ChannelYoutube({
      ...props,
      id: new ChannelId(nanoid()),
    });
  }

  public static rehydrate(props: ChannelYoutubeProps) {
    return new ChannelYoutube({
      ...props,
    });
  }
}
