import Color from 'color';

import { Performer } from './Performer';

describe('Performer', () => {
  it('constructs', () => {
    const performer = Performer.create({
      name: '鷹宮リオン',
      organizationId: null,
      branchId: null,
      description: null,
      avatar: null,
      url: null,
      twitterUsername: null,
      color: new Color('#ff0000'),
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    expect(performer.name.value).toBe('鷹宮リオン');
  });

  it('updates', () => {
    let performer = Performer.create({
      name: '鷹宮リオン',
      color: new Color('#ff0000'),
      organizationId: null,
      branchId: null,
      description: null,
      avatar: null,
      url: null,
      twitterUsername: null,
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    performer = performer.update({
      color: new Color('#00ff00'),
    });

    expect(performer.color.hex()).toBe('#00FF00');
  });

  it('removes field when null specified', () => {
    let performer = Performer.create({
      name: '鷹宮リオン',
      description: 'これは説明です',
      color: new Color('#ff0000'),
      organizationId: null,
      branchId: null,
      avatar: null,
      url: null,
      twitterUsername: null,
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    performer = performer.update({
      description: null,
    });

    expect(performer.description).toBeNull();
  });
});
