import dayjs from 'dayjs';

import { Timestamps } from '../../_shared';
import { MediaAttachment } from './media-attachment';
import { MediaAttachmentId } from './media-attachment-id';

describe('MediaAttachment', () => {
  it('can be created', () => {
    const media = MediaAttachment.create({
      filename: 'filename.png',
      blurDataUri: 'data:png;base64,' + Buffer.from([123]).toString('base64'),
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
      blurDataUri: 'data:png;base64,' + Buffer.from([123]).toString('base64'),
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
