import { nanoid } from 'nanoid';

import { MediaAttachmentId } from './media-attachment-id';

describe('MediaAttachmentId', () => {
  it('can be constructed', () => {
    const value = nanoid();
    const id = new MediaAttachmentId(value);
    expect(id.value).toBe(value);
  });

  it('can be generated', () => {
    expect(new MediaAttachmentId().value).toHaveLength(21);
  });
});
