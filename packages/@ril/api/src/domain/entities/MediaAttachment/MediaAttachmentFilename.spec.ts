import {
  MediaAttachmentFilename,
  MediaAttachmentFilenameInvalidError,
  MediaAttachmentFilenameLengthError,
} from './MediaAttachmentFilename';

describe('MediaAttachmentFilename', () => {
  it('can be constructed', () => {
    const filename = new MediaAttachmentFilename('file.png');
    expect(filename.value).toBe('file.png');
  });

  it('can be constructed from existing instance', () => {
    const filename = new MediaAttachmentFilename('file.png');
    const filename2 = new MediaAttachmentFilename(filename);
    expect(filename2.value).toBe('file.png');
  });

  it('throws an error when characters are invalid', () => {
    expect(() => {
      new MediaAttachmentFilename('ごきげんよう');
    }).toThrowError(MediaAttachmentFilenameInvalidError);
  });

  it('throws an error when the filename is too long', () => {
    expect(() => {
      new MediaAttachmentFilename('a'.repeat(300) + '.png');
    }).toThrowError(MediaAttachmentFilenameLengthError);
  });
});
