import { z } from 'zod';

import { registry } from '../../../api';
import { PathStreamId } from '../../../components/parameters/PathStreamId';
import { Stream } from '../../../components/schemas/Stream';

registry.registerPath({
  method: 'get',
  path: '/api/v1/streams/{streamId}',
  operationId: 'showStream',
  summary: '配信を表示',
  request: {
    params: z.object({
      streamId: PathStreamId,
    }),
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: Stream },
      },
    },
    404: {
      description: '配信が存在しないときのレスポンスです',
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/streams',
  operationId: 'createStream',
  summary: '配信を作成',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            videoId: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: Stream },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/streams',
  operationId: 'listStreams',
  summary: '配信を一覧',
  request: {},
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: z.array(Stream) },
      },
    },
  },
});
