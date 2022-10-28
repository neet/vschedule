import 'reflect-metadata';

import { CreatePerformer } from '../app/use-cases/CreatePerformer';
import { container } from './inversify-config';

const main = async () => {
  await container.resolve(CreatePerformer).invoke({
    name: '本間ひまわり',
    description: '本間ひまわりさん',
    youtubeChannelId: 'UC0g1AE0DOjBYnLhkgoRWN1w',
    twitterUsername: 'honmahimawari',
    webSubEnabled: process.env.NODE_ENV === 'production',
  });
};

main();
