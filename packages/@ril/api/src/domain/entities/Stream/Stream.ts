import dayjs, { Dayjs } from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';
import { URL } from 'url';

import { Entity, PrimitiveOf } from '../../_core';
import { ITimestamped } from '../../_shared/Timestamped';
import { MediaAttachment } from '../MediaAttachment';
import { PerformerId } from '../Performer/PerformerId';
import { StreamDescription } from './StreamDescription';
import { StreamId } from './StreamId';
import { StreamTitle } from './StreamTitle';

export class InvalidStreamTimestampError extends Error {}

export interface IStream extends ITimestamped {
  readonly id: StreamId;
  readonly title: StreamTitle;
  readonly url: URL;
  readonly ownerId: PerformerId;
  readonly description?: StreamDescription;
  readonly thumbnail?: MediaAttachment;
  readonly startedAt: Dayjs;
  readonly endedAt?: Dayjs;
}

export class Stream extends Entity<StreamId, IStream> implements IStream {
  public constructor(props: IStream) {
    super(props);

    if (props.createdAt.isAfter(props.updatedAt)) {
      throw new InvalidStreamTimestampError(
        'createdAt cannot be after updatedAt',
      );
    }

    if (props.startedAt.isAfter(props.endedAt)) {
      throw new InvalidStreamTimestampError(
        'createdAt cannot be after updatedAt',
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

  public get createdAt(): Dayjs {
    return this._props.createdAt;
  }

  public get updatedAt(): Dayjs {
    return this._props.updatedAt;
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

  public get duration(): Duration | undefined {
    if (this.endedAt == null) {
      return;
    }

    return dayjs.duration(this.endedAt.diff(this.startedAt));
  }

  public static fromPrimitive(props: PrimitiveOf<IStream>): Stream {
    return new Stream({
      id: new StreamId(props.id),
      title: new StreamTitle(props.title),
      url: props.url,
      ownerId: new PerformerId(props.ownerId),
      thumbnail: props.thumbnail,
      description:
        props.description != null
          ? new StreamDescription(props.description)
          : undefined,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      startedAt: props.startedAt,
    });
  }
}
