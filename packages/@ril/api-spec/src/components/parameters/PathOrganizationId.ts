import { z } from 'zod';

import { registry } from '../../api';

export const PathOrganizationId = registry.registerParameter(
  'PathOrganizationId',
  z.string().openapi({ param: { name: 'organizationId', in: 'path' } }),
);
