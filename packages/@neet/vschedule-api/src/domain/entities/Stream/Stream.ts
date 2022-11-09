import dayjs, { Dayjs } from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';
import { produce } from 'immer';
import { Mixin } from 'ts-mixer';
import { URL } from 'url';

import { DomainError, Entity, RehydrateParameters } from '../../_core';
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

export class StreamInvalidTimestampError extends DomainError {
  public readonly name = 'StreamInvalidTimestampError';

  public constructor(
    public readonly startedAt: Dayjs,
    public readonly endedAt: Dayjs | null,
  ) {
    super(
      `startedAt cannot be after endedAt. Got ${startedAt} as start and ${endedAt} as ended at`,
    );
  }
}

export class StreamAlreadyEndedError extends DomainError {
  public readonly name = 'StreamInvalidEndingError';

  public constructor(id: StreamId) {
    super(`Stream ${id.value} has already ended`);
  }
}

export interface StreamProps {
  readonly id: StreamId;
  readonly title: StreamTitle;
  readonly url: URL;
  readonly ownerId: PerformerId;
  readonly castIds: readonly PerformerId[];
  readonly startedAt: Dayjs;
  readonly timestamps: Timestamps;
  readonly description: StreamDescription | null;
  readonly thumbnail: MediaAttachment | null;
  readonly endedAt: Dayjs | null;
}

const mixins = Mixin(Entity<StreamId, StreamProps>, TimestampMixin);

export class Stream extends mixins implements ITimestamps {
  public constructor(props: StreamProps) {
    super(props);

    if (props.startedAt.isAfter(props.endedAt)) {
      throw new StreamInvalidTimestampError(props.startedAt, props.endedAt);
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

  public get thumbnail(): MediaAttachment | null {
    return this._props.thumbnail;
  }

  public get description(): StreamDescription | null {
    return this._props.description;
  }

  public get startedAt(): Dayjs {
    return this._props.startedAt;
  }

  public get endedAt(): Dayjs | null {
    return this._props.endedAt;
  }

  public get ownerId(): PerformerId {
    return this._props.ownerId;
  }

  public get castIds(): readonly PerformerId[] {
    return this._props.castIds;
  }

  public get duration(): Duration | null {
    if (this.endedAt == null) {
      return null;
    }

    return dayjs.duration(this.endedAt.diff(this.startedAt));
  }

  public end(endedAt: Dayjs): Stream {
    if (this.endedAt !== null) {
      throw new StreamAlreadyEndedError(this.id);
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
      id: new StreamId(),
      timestamps: new Timestamps(),
    });
  }

  public static rehydrate(props: RehydrateParameters<StreamProps>): Stream {
    return new Stream({
      id: new StreamId(props.id),
      title: new StreamTitle(props.title),
      url: props.url,
      ownerId: new PerformerId(props.ownerId),
      castIds: props.castIds,
      thumbnail: props.thumbnail,
      description:
        props.description !== null
          ? new StreamDescription(props.description)
          : null,
      timestamps: props.timestamps,
      startedAt: props.startedAt,
      endedAt: props.endedAt,
    });
  }
}