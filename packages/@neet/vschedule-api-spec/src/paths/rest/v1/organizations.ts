import { z } from 'zod';

import { registry } from '../../../api';
import { PathOrganizationId } from '../../../components/parameters/PathOrganizationId';
import { Organization } from '../../../components/schemas/Organization';

registry.registerPath({
  method: 'get',
  path: '/rest/v1/organizations/{organizationId}',
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
  path: '/rest/v1/organizations',
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
