import { Dayjs } from 'dayjs';

import { Entity } from '../../utils/Entity';
import { Uuid } from '../Uuid';
import { MediaAttachmentBucket } from './MediaAttachmentBucket';
import { MediaAttachmentFilename } from './MediaAttachmentFilename';

export interface MediaAttachmentProps {
  readonly id: Uuid;
  readonly blur: Buffer;
  readonly filename: MediaAttachmentFilename;
  readonly bucket?: MediaAttachmentBucket;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}

export class MediaAttachment extends Entity<MediaAttachmentProps> {
  public static from(props: MediaAttachmentProps): MediaAttachment {
    return new MediaAttachment(props);
  }

  get id(): string {
    return this._props.id.valueOf();
  }

  get filename(): string {
    return this._props.filename.valueOf();
  }

  get bucket(): string | undefined {
    return this._props.bucket?.valueOf();
  }

  get blur(): Buffer {
    return this._props.blur;
  }

  get createdAt(): Dayjs {
    return this._props.createdAt;
  }

  get updatedAt(): Dayjs {
    return this._props.updatedAt;
  }

  get extension(): string | undefined {
    return this.filename.split('.').pop();
  }
}
