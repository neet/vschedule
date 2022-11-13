import { LoggingWinston } from '@google-cloud/logging-winston';
import * as winston from 'winston';

import { IConfigLogger } from '../../modules/_shared';

const createLogger = (config: IConfigLogger): winston.Logger => {
  const options: winston.LoggerOptions = {
    levels: winston.config.syslog.levels,
    transports: [],
  };

  if (config.type === 'console') {
    options.level = 'debug';
    options.format = winston.format.combine(
      winston.format.metadata(),
      winston.format.cli(),
    );
    options.transports = [new winston.transports.Console()];
  }

  if (config.type === 'cloud-logging') {
    options.level = 'info';
    options.format = undefined;
    options.transports = [new LoggingWinston()];
  }

  return winston.createLogger(options);
};

export { createLogger };
