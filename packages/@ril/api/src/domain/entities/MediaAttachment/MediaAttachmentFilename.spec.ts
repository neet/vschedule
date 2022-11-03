import {
  InvalidFilenameError,
  MediaAttachmentFilename,
} from './MediaAttachmentFilename';

describe('MediaAttachmentFilename', () => {
  it('can be constructed', () => {
    const filename = new MediaAttachmentFilename('file.png');
    expect(filename.value).toBe('file.png');
  });

  it('throws an error when characters are invalid', () => {
    expect(() => {
      new MediaAttachmentFilename('ごきげんよう');
    }).toThrowError(InvalidFilenameError);
  });

  it('throws an error when the filename is too long', () => {
    expect(() => {
      new MediaAttachmentFilename('a'.repeat(300));
    }).toThrowError(InvalidFilenameError);
  });
});
