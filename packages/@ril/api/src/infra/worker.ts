import { PubSub } from '@google-cloud/pubsub';

import { RefreshYoutubeWebHubSubscription } from '../app/use-cases/RefreshYoutubeWebHubSubscription';
import { container } from './inversify-config';

const main = async () => {
  const pubSub = new PubSub();
  const refreshSubscription = container.get(RefreshYoutubeWebHubSubscription);

  const [subscription] = await pubSub.createSubscription(
    'refresh-topic',
    'refresh-subscription',
  );

  subscription.on('message', (message: any) => {
    refreshSubscription.invoke({
      actorId: message.data.json.actorId,
    });
  });
};

main();
