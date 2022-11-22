import { nanoid } from 'nanoid';

import { ChannelId } from './channel-id';

describe('ChannelId', () => {
  it('can be constructed', () => {
    const value = nanoid();
    const id = new ChannelId(value);
    expect(id.value).toBe(value);
  });
});
