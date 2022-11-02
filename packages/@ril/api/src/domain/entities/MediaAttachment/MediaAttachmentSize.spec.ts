import {
  InvalidMediaAttachmentSizeError,
  MediaAttachmentSize,
} from './MediaAttachmentSize';

describe('MediaAttachmentSize', () => {
  it('can be constructed', () => {
    const size = new MediaAttachmentSize(123);
    expect(size.value).toBe(123);
  });

  it('throws an error when the size is not a natural number', () => {
    expect(() => {
      new MediaAttachmentSize(0);
    }).toThrowError(InvalidMediaAttachmentSizeError);
  });
});
