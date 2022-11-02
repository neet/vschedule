import { Color } from '../../_shared';
import { Performer } from './Performer';

describe('Performer', () => {
  it('constructs', () => {
    const performer = Performer.create({
      name: '鷹宮リオン',
      organizationId: null,
      description: null,
      avatar: null,
      url: null,
      twitterUsername: null,
      color: Color.fromHex('#ff0000'),
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    expect(performer.toJSON()).toMatchInlineSnapshot(`
      {
        "avatar": null,
        "color": "#ff0000",
        "description": null,
        "id": "33irD-akG49xL6Zq675ad",
        "name": "鷹宮リオン",
        "organizationId": null,
        "timestamps": Timestamps {
          "createdAt": "2022-11-01T20:19:48.285Z",
          "updatedAt": "2022-11-01T20:19:48.285Z",
          Symbol(immer-draftable): true,
        },
        "twitterUsername": null,
        "url": null,
        "youtubeChannelId": "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
      }
    `);
  });

  it('updates', () => {
    let performer = Performer.create({
      name: '鷹宮リオン',
      color: Color.fromHex('#ff0000'),
      organizationId: null,
      description: null,
      avatar: null,
      url: null,
      twitterUsername: null,
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    performer = performer.update({
      color: Color.fromHex('#00ff00'),
    });

    expect(performer.color.value).toBe('#00ff00');
  });

  it('removes field when null specified', () => {
    let performer = Performer.create({
      name: '鷹宮リオン',
      description: 'これは説明です',
      color: Color.fromHex('#ff0000'),
      organizationId: null,
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
