import {
  InvalidBucketNameError,
  MediaAttachmentBucket,
} from './MediaAttachmentBucket';

describe('MediaAttachmentBucket', () => {
  it('can be constructed', () => {
    const bucket = new MediaAttachmentBucket('bucket');
    expect(bucket.value).toBe('bucket');
  });

  it('throws an error when characters are invalid', () => {
    expect(() => {
      new MediaAttachmentBucket('ごきげんよう');
    }).toThrowError(InvalidBucketNameError);
  });

  it('throws an error when the bucket name is too long', () => {
    expect(() => {
      new MediaAttachmentBucket('a'.repeat(300));
    }).toThrowError(InvalidBucketNameError);
  });
});
