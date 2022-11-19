import { z } from 'zod';

import { registry } from '../../../api';
import { PathStreamId } from '../../../components/parameters/PathStreamId';
import { Stream } from '../../../components/schemas/Stream';

registry.registerPath({
  method: 'get',
  path: '/rest/v1/streams/{streamId}',
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
  method: 'get',
  path: '/rest/v1/streams',
  operationId: 'listStreams',
  summary: '配信を一覧',
  request: {
    query: z.object({
      limit: z.number().optional(),
      since: z.date().optional(),
      until: z.date().optional(),
      organizationId: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: z.array(Stream) },
      },
    },
  },
});
