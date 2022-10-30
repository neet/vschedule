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

const CreateActor = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  youtubeChannelId: z.string(),
  twitterUsername: z.string().optional(),
});

registry.registerPath({
  path: '/api/v1/actors',
  method: 'post',
  operationId: 'createActor',
  summary: 'アクターを作成',
  request: {
    body: {
      required: true,
      description: 'アクターの情報です',
      content: {
        'application/json': {
          schema: CreateActor,
        },
      },
    },
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
