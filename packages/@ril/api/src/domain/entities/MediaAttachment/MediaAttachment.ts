import { Dayjs } from 'dayjs';

import { PrimitiveOf } from '../../_core';
import { Entity } from '../../_core/Entity';
import { Base64 } from '../../_shared/Base64';
import { MediaAttachmentBucket } from './MediaAttachmentBucket';
import { MediaAttachmentFilename } from './MediaAttachmentFilename';
import { MediaAttachmentId } from './MediaAttachmentId';
import { MediaAttachmentSize } from './MediaAttachmentSize';

export interface IMediaAttachment {
  readonly id: MediaAttachmentId;
  readonly filename: MediaAttachmentFilename;
  readonly base64: Base64;
  readonly width: MediaAttachmentSize;
  readonly height: MediaAttachmentSize;
  readonly bucket?: MediaAttachmentBucket;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}

const mixins = Entity<MediaAttachmentId, IMediaAttachment>;

export class MediaAttachment extends mixins implements IMediaAttachment {
  public constructor(props: IMediaAttachment) {
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

  get createdAt(): Dayjs {
    return this._props.createdAt;
  }

  get updatedAt(): Dayjs {
    return this._props.updatedAt;
  }

  get extension(): string | undefined {
    return this.filename.value.split('.').pop();
  }

  public static fromPrimitive(
    props: PrimitiveOf<IMediaAttachment>,
  ): MediaAttachment {
    return new MediaAttachment({
      id: new MediaAttachmentId(props.id),
      base64: new Base64(props.base64),
      width: new MediaAttachmentSize(props.width),
      height: new MediaAttachmentSize(props.height),
      filename: new MediaAttachmentFilename(props.filename),
      bucket:
        props.bucket != null
          ? new MediaAttachmentBucket(props.bucket)
          : undefined,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }
}
