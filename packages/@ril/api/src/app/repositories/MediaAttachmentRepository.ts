import {
  MediaAttachment,
  MediaAttachmentFilename,
  MediaAttachmentId,
} from '../../domain/entities';

export interface IMediaAttachmentRepository {
  findById(id: MediaAttachmentId): Promise<MediaAttachment | undefined>;

  save(
    filename: MediaAttachmentFilename,
    buffer: Buffer,
  ): Promise<MediaAttachment>;

  delete(id: MediaAttachmentId): Promise<void>;
}
