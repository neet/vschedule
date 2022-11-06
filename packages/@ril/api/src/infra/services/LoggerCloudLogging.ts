import { LoggingWinston } from '@google-cloud/logging-winston';
import { config, createLogger, format } from 'winston';

const loggingWinston = new LoggingWinston();

export const logger = createLogger({
  level: 'info',
  levels: config.syslog.levels,
  format: format.combine(format.metadata(), format.cli()),
  transports: [loggingWinston],
});
