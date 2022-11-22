import {
  MediaAttachment,
  MediaAttachmentFilename,
  MediaAttachmentId,
} from '../../domain';

export interface IMediaAttachmentRepository {
  findById(id: MediaAttachmentId): Promise<MediaAttachment | undefined>;
  findByFilename(
    filename: MediaAttachmentFilename,
  ): Promise<MediaAttachment | undefined>;
  findByRemoteUrl(url: URL): Promise<MediaAttachment | undefined>;

  save(
    filename: MediaAttachmentFilename,
    buffer: Buffer,
    remoteUrl?: URL,
  ): Promise<MediaAttachment>;
  delete(id: MediaAttachmentId): Promise<void>;
}
