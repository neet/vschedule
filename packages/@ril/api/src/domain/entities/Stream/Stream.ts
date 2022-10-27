import dayjs, { Dayjs } from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';
import { URL } from 'url';

import { Entity, PrimitiveOf } from '../../_core';
import { Actor } from '../Actor';
import { MediaAttachment } from '../MediaAttachment';
import { StreamDescription } from './StreamDescription';
import { StreamId } from './StreamId';
import { StreamTitle } from './StreamTitle';

export interface StreamProps {
  readonly id: StreamId;
  readonly title: StreamTitle;
  readonly url: URL;
  readonly description?: StreamDescription;
  readonly thumbnail?: MediaAttachment;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
  readonly startedAt: Dayjs;
  readonly endedAt?: Dayjs;
  readonly actor: Actor;
}

export class Stream extends Entity<StreamId, StreamProps> {
  public constructor(props: StreamProps) {
    super(props);
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

  public get actor(): Actor {
    return this._props.actor;
  }

  public get duration(): Duration | undefined {
    if (this.endedAt == null) {
      return;
    }

    return dayjs.duration(this.endedAt.diff(this.startedAt));
  }

  public static fromPrimitive(props: PrimitiveOf<StreamProps>): Stream {
    return new Stream({
      id: new StreamId(props.id),
      title: new StreamTitle(props.title),
      url: props.url,
      thumbnail: props.thumbnail,
      description:
        props.description != null
          ? new StreamDescription(props.description)
          : undefined,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      startedAt: props.startedAt,
      actor: props.actor,
    });
  }
}
