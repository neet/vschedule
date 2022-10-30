import { z } from 'zod';

import { registry } from '../../api';
import { YoutubeAtomFeed } from '../../components/request-bodies/YoutubeAtomFeed';
import { YoutubeWebsubVerification } from '../../components/request-bodies/YoutubeWebsubVerification';

registry.registerPath({
  method: 'get',
  path: '/webhook/youtube',
  operationId: 'verifyYoutubeWebsub',
  request: {
    params: YoutubeWebsubVerification,
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

registry.registerPath({
  method: 'post',
  path: '/webhook/youtube',
  operationId: 'notifyYoutubeWebsub',
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
