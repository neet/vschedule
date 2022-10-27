import { z } from 'zod';

import { registry } from '../../api';
import { YoutubeAtomFeed } from '../../components/request-bodies/YoutubeAtomFeed';
import { YoutubeWebHubVerification } from '../../components/request-bodies/YoutubeWebHubVerification';

registry.registerWebhook({
  method: 'get',
  path: '/webhook/youtube',
  request: {
    params: YoutubeWebHubVerification,
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': {
          schema: z.string(),
        },
      },
    },
  },
});

registry.registerWebhook({
  method: 'post',
  path: '/webhook/youtube',
  request: {
    body: {
      required: true,
      content: {
        'application/atom+xml': {
          schema: YoutubeAtomFeed,
        },
      },
    },
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
    },
  },
});
