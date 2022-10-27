import { Dayjs } from 'dayjs';

import { PrimitiveOf } from '../../_core';
import { Entity } from '../../_core/Entity';
import { MediaAttachmentBucket } from './MediaAttachmentBucket';
import { MediaAttachmentFilename } from './MediaAttachmentFilename';
import { MediaAttachmentId } from './MediaAttachmentId';

export interface MediaAttachmentProps {
  readonly id: MediaAttachmentId;
  readonly filename: MediaAttachmentFilename;
  readonly bucket?: MediaAttachmentBucket;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}

export class MediaAttachment extends Entity<
  MediaAttachmentId,
  MediaAttachmentProps
> {
  public constructor(props: MediaAttachmentProps) {
    super(props);
  }

  get id(): MediaAttachmentId {
    return this._props.id;
  }

  get filename(): MediaAttachmentFilename {
    return this._props.filename;
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
    props: PrimitiveOf<MediaAttachmentProps>,
  ): MediaAttachment {
    return new MediaAttachment({
      id: new MediaAttachmentId(props.id),
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
