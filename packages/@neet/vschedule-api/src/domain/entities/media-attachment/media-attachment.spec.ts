import dayjs from 'dayjs';

import { Timestamps } from '../_shared/timestamps';
import { MediaAttachment } from './media-attachment';
import { MediaAttachmentId } from './media-attachment-id';

const dataUri =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAPUlEQVR4nGPY18KQoMOQasC3q4GBIdeaIVFfrcHbKtGUgaHUyej/p7tX1y8ssmdg0GRg2NjabMTAWuzKAACg5RADO0S3DwAAAABJRU5ErkJggg==';

describe('MediaAttachment', () => {
  it('can be created', () => {
    const media = MediaAttachment.create({
      filename: 'filename.png',
      blurDataUri: dataUri,
      width: 1,
      height: 1,
      bucket: '123',
      remoteUrl: null,
    });

    expect(media.filename.value).toBe('filename.png');
    expect(media.width.value).toBe(1);
    expect(media.height.value).toBe(1);
    expect(media.extension).toBe('png');
  });

  it('can be rehydrated', () => {
    const media = MediaAttachment.rehydrate({
      id: new MediaAttachmentId(),
      filename: 'filename.png',
      blurDataUri: dataUri,
      width: 1,
      height: 1,
      bucket: '123',
      remoteUrl: null,
      timestamps: new Timestamps({
        createdAt: dayjs(),
        updatedAt: dayjs(),
      }),
    });

    expect(media.filename.value).toBe('filename.png');
    expect(media.width.value).toBe(1);
    expect(media.height.value).toBe(1);
    expect(media.extension).toBe('png');
  });
});
