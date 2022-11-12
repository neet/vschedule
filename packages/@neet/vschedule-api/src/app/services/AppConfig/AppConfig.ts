export interface IAppConfigYoutube {
  readonly dataApiKey?: string;
  readonly websubHmacSecret: string;
  readonly websubVerifyToken: string;
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
    /** パフォーマーを再講読するタスクのリソース名. Can be computed by tasks.queuePath() */
    readonly resubscription: string;
  };
}

export interface IAppConfigLogger {
  readonly type: 'console' | 'cloud-logging';
}

export interface IAppSecrets {
  readonly passwordSalt: string;
}

export interface IAppAdmin {
  readonly emails: string[];
}

export interface IAppSession {
  readonly store: 'firestore' | 'memory';
  readonly secret: string;
}

export interface IAppConfig {
  readonly youtube: IAppConfigYoutube;
  readonly storage: IAppConfigStorage;
  readonly server: IAppConfigServer;
  readonly logger: IAppConfigLogger;
  readonly tasks: IAppConfigTasks;
  readonly secrets: IAppSecrets;
  readonly admin: IAppAdmin;
  readonly session: IAppSession;
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
