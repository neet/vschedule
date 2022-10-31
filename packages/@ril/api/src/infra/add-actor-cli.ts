import 'reflect-metadata';

import { CreateActor } from '../app/use-cases/CreatePerformer';
import { container } from './inversify-config';

const main = async () => {
  await container.get(CreateActor).invoke({
    name: '本間ひまわり',
    description: '本間ひまわりさん',
    youtubeChannelId: 'UC0g1AE0DOjBYnLhkgoRWN1w',
    twitterUsername: 'honmahimawari',
    websubEnabled: process.env.NODE_ENV === 'production',
  });
};

main();
