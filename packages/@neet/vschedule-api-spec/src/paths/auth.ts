import { z } from 'zod';

import { registry } from '../api';
import { User } from '../components/schemas/User';

registry.registerPath({
  path: '/auth/login',
  method: 'post',
  operationId: 'login',
  summary: 'ログイン',
  request: {
    body: {
      required: true,
      description: 'ログイン情報です',
      content: {
        'application/json': {
          schema: z.object({
            email: z.string().email(),
            password: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': {
          schema: User,
        },
      },
    },
  },
});

registry.registerPath({
  path: '/auth/logout',
  method: 'post',
  operationId: 'logout',
  summary: 'ログアウト',
  request: {},
  responses: {
    204: {
      description: '成功時のレスポンスです',
    },
  },
});

registry.registerPath({
  path: '/auth/signup',
  method: 'post',
  operationId: 'signup',
  summary: 'サインアップ',
  request: {
    body: {
      required: true,
      description: 'ログイン情報です',
      content: {
        'application/json': {
          schema: z.object({
            email: z.string().email(),
            password: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': {
          schema: User,
        },
      },
    },
  },
});

registry.registerPath({
  path: '/auth/verify_credentials',
  method: 'post',
  operationId: 'verifyCredentials',
  summary: '現在のアカウントを認証します',
  request: {},
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': {
          schema: User,
        },
      },
    },
    204: {
      description: '未ログイン時のレスポンスです',
    },
  },
});
