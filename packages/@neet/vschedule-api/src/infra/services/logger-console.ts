import { config, createLogger, format, transports } from 'winston';

import { ILogger } from '../../app/services/logger';

export const loggerConsole: ILogger = createLogger({
  // どのレベルのエラーを出す？
  level: 'debug',
  levels: config.syslog.levels,
  // https://github.com/winstonjs/logform
  format: format.combine(format.metadata(), format.cli()),
  transports: [new transports.Console()],
});
