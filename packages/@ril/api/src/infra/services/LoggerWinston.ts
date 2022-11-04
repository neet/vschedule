import { config, createLogger, format, transports } from 'winston';

export const logger = createLogger({
  // どのレベルのエラーを出す？
  level: 'info',
  levels: config.syslog.levels,
  // https://github.com/winstonjs/logform
  format: format.combine(format.metadata(), format.cli()),
  transports: [new transports.Console()],
});
