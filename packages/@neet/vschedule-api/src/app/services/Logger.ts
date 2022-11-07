// https://github.com/winstonjs/winston#logging
export type Severity =
  | 'emerg'
  | 'alert'
  | 'crit'
  | 'error'
  | 'warning'
  | 'notice'
  | 'info'
  | 'debug';

export type ILogger<K extends string = Severity> = {
  readonly [key in K]: (...args: unknown[]) => void;
};
