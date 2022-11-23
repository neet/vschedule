import {
  ChannelDescription,
  ChannelDescriptionLengthError,
} from './channel-description';

describe('ChannelDescription', () => {
  it('constructs', () => {
    const description = new ChannelDescription('hello');
    expect(description.value).toBe('hello');
  });

  it('throws and error when description is too long', () => {
    expect(() => {
      new ChannelDescription('a'.repeat(5001));
    }).toThrowError(ChannelDescriptionLengthError);
  });
});
