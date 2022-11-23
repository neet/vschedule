import { ChannelName, ChannelNameLengthError } from './channel-name';

describe('ChannelName', () => {
  it('constructs', () => {
    const description = new ChannelName('hello');
    expect(description.value).toBe('hello');
  });

  it('throws and error when description is too long', () => {
    expect(() => {
      new ChannelName('a'.repeat(51));
    }).toThrow(ChannelNameLengthError);
  });
});
