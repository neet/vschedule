import { Mixin } from 'ts-mixer';

import { Entity, RehydrateParameters } from '../../_core/Entity';
import { Base64 } from '../../_shared/Base64';
import {
  ITimestamps,
  TimestampMixin,
  Timestamps,
} from '../../_shared/Timestamps';
import { MediaAttachmentBucket } from './MediaAttachmentBucket';
import { MediaAttachmentFilename } from './MediaAttachmentFilename';
import { MediaAttachmentId } from './MediaAttachmentId';
import { MediaAttachmentSize } from './MediaAttachmentSize';

export interface MediaAttachmentProps {
  readonly id: MediaAttachmentId;
  readonly filename: MediaAttachmentFilename;
  readonly base64: Base64;
  readonly width: MediaAttachmentSize;
  readonly height: MediaAttachmentSize;
  readonly bucket?: MediaAttachmentBucket;
  readonly timestamps: Timestamps;
}

const mixins = Mixin(
  Entity<MediaAttachmentId, MediaAttachmentProps>,
  TimestampMixin,
);

export class MediaAttachment extends mixins implements ITimestamps {
  public constructor(props: MediaAttachmentProps) {
    super(props);
  }

  get id(): MediaAttachmentId {
    return this._props.id;
  }

  get filename(): MediaAttachmentFilename {
    return this._props.filename;
  }

  get base64(): Base64 {
    return this._props.base64;
  }

  get width(): MediaAttachmentSize {
    return this._props.width;
  }

  get height(): MediaAttachmentSize {
    return this._props.height;
  }

  get bucket(): MediaAttachmentBucket | undefined {
    return this._props.bucket;
  }

  get extension(): string | undefined {
    return this.filename.value.split('.').pop();
  }

  public static rehydrate(
    props: RehydrateParameters<MediaAttachmentProps>,
  ): MediaAttachment {
    return new MediaAttachment({
      id: MediaAttachmentId.from(props.id),
      base64: Base64.from(props.base64),
      width: MediaAttachmentSize.from(props.width),
      height: MediaAttachmentSize.from(props.height),
      filename: MediaAttachmentFilename.from(props.filename),
      bucket:
        props.bucket != null
          ? MediaAttachmentBucket.from(props.bucket)
          : undefined,
      timestamps: props.timestamps,
    });
  }

  public static create(
    props: Omit<RehydrateParameters<MediaAttachmentProps>, 'id' | 'timestamps'>,
  ) {
    return MediaAttachment.rehydrate({
      ...props,
      id: MediaAttachmentId.create(),
      timestamps: Timestamps.create(),
    });
  }
}
