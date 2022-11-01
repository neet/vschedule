import dayjs, { Dayjs } from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';
import { produce } from 'immer';
import { Mixin } from 'ts-mixer';
import { URL } from 'url';

import { Entity, RehydrateParameters } from '../../_core';
import {
  ITimestamps,
  TimestampMixin,
  Timestamps,
} from '../../_shared/Timestamps';
import { MediaAttachment } from '../MediaAttachment';
import { PerformerId } from '../Performer/PerformerId';
import { StreamDescription } from './StreamDescription';
import { StreamId } from './StreamId';
import { StreamTitle } from './StreamTitle';

export class InvalidStreamTimestampError extends Error {}
export class InvalidStreamEndingError extends Error {}

export interface StreamProps {
  readonly id: StreamId;
  readonly title: StreamTitle;
  readonly url: URL;
  readonly ownerId: PerformerId;
  readonly castIds: readonly PerformerId[];
  readonly description?: StreamDescription;
  readonly thumbnail?: MediaAttachment;
  readonly startedAt: Dayjs;
  readonly endedAt?: Dayjs;
  readonly timestamps: Timestamps;
}

const mixins = Mixin(Entity<StreamId, StreamProps>, TimestampMixin);

export class Stream extends mixins implements ITimestamps {
  public constructor(props: StreamProps) {
    super(props);

    if (props.startedAt.isAfter(props.endedAt)) {
      throw new InvalidStreamTimestampError(
        'startedAt cannot be after endedAt',
      );
    }
  }

  public get id(): StreamId {
    return this._props.id;
  }

  public get title(): StreamTitle {
    return this._props.title;
  }

  public get url(): URL {
    return this._props.url;
  }

  public get thumbnail(): MediaAttachment | undefined {
    return this._props.thumbnail;
  }

  public get description(): StreamDescription | undefined {
    return this._props.description;
  }

  public get startedAt(): Dayjs {
    return this._props.startedAt;
  }

  public get endedAt(): Dayjs | undefined {
    return this._props.endedAt;
  }

  public get ownerId(): PerformerId {
    return this._props.ownerId;
  }

  public get castIds(): readonly PerformerId[] {
    return this._props.castIds;
  }

  public get duration(): Duration | undefined {
    if (this.endedAt == null) {
      return;
    }

    return dayjs.duration(this.endedAt.diff(this.startedAt));
  }

  public end(endedAt: Dayjs): Stream {
    if (this.endedAt != null) {
      throw new InvalidStreamEndingError(`Stream ${this.id} has already ended`);
    }

    return new Stream(
      produce(this._props, (draft) => {
        draft.endedAt = endedAt;
        draft.timestamps = draft.timestamps.update();
      }),
    );
  }

  public static create(
    props: Omit<RehydrateParameters<StreamProps>, 'id' | 'timestamps'>,
  ) {
    return Stream.rehydrate({
      ...props,
      id: StreamId.create().value,
      timestamps: Timestamps.create(),
    });
  }

  public static rehydrate(props: RehydrateParameters<StreamProps>): Stream {
    return new Stream({
      id: StreamId.from(props.id),
      title: StreamTitle.from(props.title),
      url: props.url,
      ownerId: PerformerId.from(props.ownerId),
      castIds: props.castIds,
      thumbnail: props.thumbnail,
      description:
        props.description != null
          ? StreamDescription.from(props.description)
          : undefined,
      timestamps: props.timestamps,
      startedAt: props.startedAt,
      endedAt: props.endedAt,
    });
  }
}
