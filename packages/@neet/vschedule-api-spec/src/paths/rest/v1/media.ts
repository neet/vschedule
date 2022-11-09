import { z } from 'zod';

import { registry } from '../../../api';
import { PathMediaFilename } from '../../../components/parameters/PathMediaFilename';

registry.registerPath({
  path: '/rest/v1/media/{mediaFilename}',
  method: 'get',
  operationId: 'showMedia',
  summary: 'メディアを表示',
  request: {
    params: z.object({
      mediaFilename: PathMediaFilename,
    }),
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
    },
  },
});
