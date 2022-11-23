import { z } from 'zod';

import { registry } from '../../../api';
import { PathPerformerId } from '../../../components/parameters/PathPerformerId';
import { Performer } from '../../../components/schemas/Performer';

registry.registerPath({
  method: 'get',
  path: '/rest/v1/performers/{performerId}',
  operationId: 'showPerformer',
  summary: 'パフォーマーを表示',
  request: {
    params: z.object({
      performerId: PathPerformerId,
    }),
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: Performer },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/rest/v1/performers',
  operationId: 'listPerformers',
  summary: 'パフォーマーを一覧',
  request: {
    query: z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: z.array(Performer) },
      },
    },
  },
});
