import { StreamTitle, StreamTitleLengthError } from './StreamTitle';

describe(StreamTitle, () => {
  it('constructs', () => {
    const title = new StreamTitle('Hello');
    expect(title.value).toBe('Hello');
  });

  it('throws an error for too long title', () => {
    expect(() => {
      new StreamTitle('a'.repeat(101));
    }).toThrow(StreamTitleLengthError);
  });
});
