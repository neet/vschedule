export interface IAppConfigYoutube {
  readonly dataApiKey?: string;
  readonly websubHmacSecret?: string;
}

export type CookieStorageType = 'cloud-storage' | 'filesystem';

export interface IAppConfigStorage {
  readonly type: CookieStorageType;
  readonly bucket: string;
}

export interface IAppConfigServer {
  readonly port: number;
  readonly origin: string;
}

export interface IAppConfigTasks {
  readonly resources: {
    /** パフォーマーを再講読するタスクのリソース名 */
    readonly resubscription: string;
  };
}

export interface IAppConfigLogger {
  readonly type: 'console' | 'cloud-logging';
}

export interface IAppConfig {
  readonly youtube: IAppConfigYoutube;
  readonly storage: IAppConfigStorage;
  readonly server: IAppConfigServer;
  readonly logger: IAppConfigLogger;
  readonly tasks: IAppConfigTasks;
}

// TODO: メソッドにしたい
const resolvePath = (config: IAppConfig, pathname: string) => {
  const origin = new URL(config.server.origin);
  origin.pathname = pathname;
  return origin.toString();
};

export const utils = {
  resolvePath,
};
