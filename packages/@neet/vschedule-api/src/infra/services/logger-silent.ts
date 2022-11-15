import winston from 'winston';

const loggerSilent = winston.createLogger();
loggerSilent.silent = true;

export { loggerSilent };
