import { LoggingWinston } from '@google-cloud/logging-winston';
import { config, createLogger } from 'winston';

import { ILogger } from '../../app/services/logger';

const loggingWinston = new LoggingWinston();

export const loggerCloudLogging: ILogger = createLogger({
  level: 'info',
  levels: config.syslog.levels,
  // 勝手にフォーマットしてくるので要らない
  // format,
  transports: [loggingWinston],
});
