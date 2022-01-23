import { MediaAttachment } from '@ril/core';

export interface MediaAttachmentRepository {
  findById(id: string): Promise<MediaAttachment | undefined>;
  save(filename: string, buffer: Buffer): Promise<MediaAttachment>;
  delete(id: string): Promise<void>;
}
