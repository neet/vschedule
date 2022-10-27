import * as uuid from 'uuid';

import { Performer } from './Performer';

describe('Performer', () => {
  it('constructs', () => {
    const actor = Performer.fromPrimitive({
      id: uuid.v4(),
      name: '鷹宮リオン',
      color: '#ff0000',
      youtubeChannelId: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
    });

    expect(actor.name).toBe('鷹宮リオン');
  });
});
