import { nanoid } from 'nanoid';

import { YoutubeChannelId } from '../_shared';
import { PerformerId } from '../performer';
import { ChannelId } from './channel-id';
import { ChannelName } from './channel-name';
import { ChannelStatus } from './channel-status';
import { ChannelYoutube } from './channel-youtube';

describe('ChannelYoutube', () => {
  it('constructs', () => {
    const entity = ChannelYoutube.create({
      name: new ChannelName('channel'),
      description: null,
      status: ChannelStatus.UNSET,
      ownerId: new PerformerId(nanoid()),
      youtubeChannelId: new YoutubeChannelId('123123'),
    });

    expect(entity.name.value).toBe('channel');
    expect(entity.status).toBe(ChannelStatus.UNSET);
  });

  it('rehydrates', () => {
    const id = nanoid();
    const entity = ChannelYoutube.rehydrate({
      id: new ChannelId(id),
      name: new ChannelName('channel'),
      description: null,
      status: ChannelStatus.UNSET,
      ownerId: new PerformerId(nanoid()),
      youtubeChannelId: new YoutubeChannelId('123123'),
    });

    expect(entity.id.value).toBe(id);
    expect(entity.name.value).toBe('channel');
    expect(entity.status).toBe(ChannelStatus.UNSET);
  });
});
