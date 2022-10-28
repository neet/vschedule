import { z } from 'zod';

import { registry } from '../../../api';
import { PathActorId } from '../../../components/parameters/PathActorId';
import { Actor } from '../../../components/schemas/Actor';

registry.registerPath({
  path: '/api/v1/actors/{actorId}',
  method: 'get',
  operationId: 'showActor',
  summary: 'アクターを表示',
  request: {
    params: z.object({
      actorId: PathActorId,
    }),
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: Actor },
      },
    },
  },
});
