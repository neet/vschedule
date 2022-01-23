import * as uuid from 'uuid';

import { Uuid, YoutubeChannelId } from '..';
import { HexColor } from '../HexColor';
import { ActorName } from '.';
import { Actor } from './Actor';

describe('Actor', () => {
  it('constructs', () => {
    const actor = Actor.from({
      id: Uuid.from(uuid.v4()),
      name: ActorName.from('鷹宮リオン'),
      color: HexColor.from('#ff0000'),
      youtubeChannelId: YoutubeChannelId.from('UC-lHJZR3Gqxm24_Vd_AJ5Yw'),
    });

    expect(actor.name).toBe('鷹宮リオン');
  });
});
