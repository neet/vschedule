import { LoggingWinston } from '@google-cloud/logging-winston';
import { config, createLogger, format } from 'winston';

import { ILogger } from '../../app/services/Logger';

const loggingWinston = new LoggingWinston();

export const loggerCloudLogging: ILogger = createLogger({
  level: 'info',
  levels: config.syslog.levels,
  format: format.combine(format.metadata(), format.json()),
  transports: [loggingWinston],
});
