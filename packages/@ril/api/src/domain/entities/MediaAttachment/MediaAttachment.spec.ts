import dayjs from 'dayjs';

import { Timestamps } from '../../_shared/Timestamps';
import { MediaAttachment } from './MediaAttachment';
import { MediaAttachmentId } from './MediaAttachmentId';

describe('MediaAttachment', () => {
  it('can be created', () => {
    const media = MediaAttachment.create({
      filename: 'filename.png',
      base64: 'data:png;base64,' + Buffer.from([123]).toString('base64'),
      width: 1,
      height: 1,
      bucket: '123',
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
      base64: 'data:png;base64,' + Buffer.from([123]).toString('base64'),
      width: 1,
      height: 1,
      bucket: '123',
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
