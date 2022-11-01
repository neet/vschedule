import { Color } from '../../_shared';
import { Performer } from './Performer';

describe('Performer', () => {
  it('constructs', () => {
    const actor = Performer.create({
      name: '鷹宮リオン',
      color: Color.fromHex('#ff0000'),
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    expect(actor.name.value).toBe('鷹宮リオン');
  });

  it('updates', () => {
    const actor = Performer.create({
      name: '鷹宮リオン',
      color: Color.fromHex('#ff0000'),
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    const newActor = actor.update({
      color: Color.fromHex('#00ff00'),
    });

    expect(newActor.color.value).toBe('#00ff00');
  });
});
