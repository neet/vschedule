import dayjs, { Dayjs } from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';

import { Entity } from '../../utils';
import { Actor } from '../Actor';
import { MediaAttachment } from '../MediaAttachment';
import { Url } from '../Url';
import { Uuid } from '../Uuid';
import { StreamDescription } from './StreamDescription';
import { StreamTitle } from './StreamTitle';

export interface StreamProps {
  readonly id: Uuid;
  readonly title: StreamTitle;
  readonly url: Url;
  readonly description?: StreamDescription;
  readonly thumbnail?: MediaAttachment;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
  readonly startedAt: Dayjs;
  readonly endedAt?: Dayjs;
  readonly actor: Actor;
}

export class Stream extends Entity<StreamProps> {
  public static from(props: StreamProps): Stream {
    return new Stream(props);
  }

  public get id(): string {
    return this._props.id.valueOf();
  }

  public get title(): string {
    return this._props.title.valueOf();
  }

  public get url(): string {
    return this._props.url.valueOf();
  }

  public get thumbnail(): MediaAttachment | undefined {
    return this._props.thumbnail;
  }

  public get description(): string | undefined {
    return this._props.description?.valueOf();
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
}
