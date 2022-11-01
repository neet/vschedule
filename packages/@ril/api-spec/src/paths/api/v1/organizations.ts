import { z } from 'zod';

import { registry } from '../../../api';
import { PathOrganizationId } from '../../../components/parameters/PathOrganizationId';
import { Organization } from '../../../components/schemas/Organization';

registry.registerPath({
  method: 'get',
  path: '/api/v1/organizations/{organizationId}',
  operationId: 'showOrganization',
  summary: '組織を表示',
  request: {
    params: z.object({
      organizationId: PathOrganizationId,
    }),
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: Organization },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/organizations',
  operationId: 'listOrganizations',
  summary: '組織を一覧',
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
        'application/json': { schema: z.array(Organization) },
      },
    },
  },
});

const CreateOrganization = z.object({
  name: z.string(),
  description: z.string().nullable(),
  color: z.string().nullable(),
  url: z.string().url().nullable(),
  youtubeChannelId: z.string().nullable(),
  twitterUsername: z.string().nullable(),
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/organizations',
  operationId: 'createOrganization',
  summary: '組織を作成',
  request: {
    body: {
      required: true,
      description: '組織の情報です',
      content: {
        'application/json': {
          schema: CreateOrganization,
        },
      },
    },
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: Organization },
      },
    },
  },
});

const UpdateOrganization = CreateOrganization.partial();

registry.registerPath({
  method: 'patch',
  path: '/api/v1/organizations/{organizationId}',
  operationId: 'updateOrganization',
  summary: '組織を作成',
  request: {
    body: {
      required: true,
      description: '組織の情報です',
      content: {
        'application/json': {
          schema: UpdateOrganization,
        },
      },
    },
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': { schema: Organization },
      },
    },
  },
});
