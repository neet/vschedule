import { Color } from '../../_shared';
import { Performer } from './Performer';
import { PerformerId } from './PerformerId';

describe('Performer', () => {
  it('constructs', () => {
    const actor = Performer.fromPrimitive({
      id: PerformerId.create().value,
      name: '鷹宮リオン',
      color: '#ff0000',
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    expect(actor.name).toBe('鷹宮リオン');
  });

  it('updates', () => {
    const actor = Performer.fromPrimitive({
      id: PerformerId.create().value,
      name: '鷹宮リオン',
      color: '#ff0000',
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    const newActor = actor.update({
      color: new Color('#00ff00').value,
    });

    expect(newActor.color.value).toBe('#00ff00');
  });
});
