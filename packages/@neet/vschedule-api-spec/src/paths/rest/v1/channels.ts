import { z } from 'zod';

import { registry } from '../../../api';
import { PathChannelId } from '../../../components/parameters/PathChannelId';

registry.registerPath({
  method: 'post',
  path: '/rest/v1/channels/{channelId}/subscribe',
  operationId: 'subscribeToChannel',
  summary: 'チャンネルを購読',
  request: {
    params: z.object({
      channelId: PathChannelId,
    }),
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
    },
  },
});
