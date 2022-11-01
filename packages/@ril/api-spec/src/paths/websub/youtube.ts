import { z } from 'zod';

import { registry } from '../../api';
import { YoutubeAtomFeed } from '../../components/request-bodies/YoutubeAtomFeed';
import { YoutubeWebsubVerification } from '../../components/request-bodies/YoutubeWebsubVerification';

registry.registerPath({
  method: 'get',
  path: '/websub/youtube',
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
  path: '/websub/youtube',
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

registry.registerPath({
  method: 'post',
  path: '/websub/youtube/resubscribe',
  operationId: 'resubscribeYoutubeWebsub',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            performerId: z.string(),
          }),
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
