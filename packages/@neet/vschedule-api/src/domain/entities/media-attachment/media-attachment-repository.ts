import { MediaAttachment } from './media-attachment';
import { MediaAttachmentFilename } from './media-attachment-filename';
import { MediaAttachmentId } from './media-attachment-id';

export interface IMediaAttachmentRepository {
  findById(id: MediaAttachmentId): Promise<MediaAttachment | undefined>;
  findByFilename(
    filename: MediaAttachmentFilename,
  ): Promise<MediaAttachment | undefined>;

  save(
    filename: MediaAttachmentFilename,
    buffer: Buffer,
    remoteUrl?: URL,
  ): Promise<MediaAttachment>;

  delete(id: MediaAttachmentId): Promise<void>;
}
