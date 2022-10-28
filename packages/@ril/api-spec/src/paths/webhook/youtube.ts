import { z } from 'zod';

import { registry } from '../../api';
import { YoutubeAtomFeed } from '../../components/request-bodies/YoutubeAtomFeed';
import { YoutubeWebSubVerification } from '../../components/request-bodies/YoutubeWebSubVerification';

registry.registerWebhook({
  method: 'get',
  path: '/webhook/youtube',
  request: {
    params: YoutubeWebSubVerification,
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
