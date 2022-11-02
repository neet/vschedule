import {
  InvalidFilenameError,
  MediaAttachmentFilename,
} from './MediaAttachmentFilename';

describe('MediaAttachmentFilename', () => {
  it('can be constructed', () => {
    const bucket = new MediaAttachmentFilename('bucket');
    expect(bucket.value).toBe('bucket');
  });

  it('throws an error when characters are invalid', () => {
    expect(() => {
      new MediaAttachmentFilename('ごきげんよう');
    }).toThrowError(InvalidFilenameError);
  });

  it('throws an error when the bucket name is too long', () => {
    expect(() => {
      new MediaAttachmentFilename('a'.repeat(300));
    }).toThrowError(InvalidFilenameError);
  });
});
