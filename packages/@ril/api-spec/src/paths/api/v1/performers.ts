import { z } from 'zod';

import { registry } from '../../../api';
import { PathPerformerId } from '../../../components/parameters/PathPerformerId';
import { Performer } from '../../../components/schemas/Performer';

registry.registerPath({
  method: 'get',
  path: '/api/v1/performers/{performerId}',
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
  path: '/api/v1/performers',
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

const CreatePerformer = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  url: z.string().url().optional(),
  youtubeChannelId: z.string(),
  twitterUsername: z.string().optional(),
  organizationId: z.string().uuid().optional(),
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/performers',
  operationId: 'createPerformer',
  summary: 'パフォーマーを作成',
  request: {
    body: {
      required: true,
      description: 'パフォーマーの情報です',
      content: {
        'application/json': {
          schema: CreatePerformer,
        },
      },
    },
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

const UpdatePerformer = CreatePerformer.partial();

registry.registerPath({
  method: 'patch',
  path: '/api/v1/performers/{performerId}',
  operationId: 'updatePerformer',
  summary: 'パフォーマーを更新',
  request: {
    params: z.object({
      performerId: PathPerformerId,
    }),
    body: {
      required: true,
      description: 'パフォーマーの情報です',
      content: {
        'application/json': {
          schema: UpdatePerformer,
        },
      },
    },
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
