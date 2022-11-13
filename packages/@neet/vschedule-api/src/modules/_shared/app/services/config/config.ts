export interface IConfigYoutube {
  readonly dataApiKey?: string;
  readonly websubHmacSecret: string;
  readonly websubVerifyToken: string;
}

export type StorageType = 'cloud-storage' | 'filesystem';

export interface IConfigStorage {
  readonly type: StorageType;
  readonly bucket: string;
}

export interface IConfigServer {
  readonly port: number;
  readonly origin: string;
}

export interface IConfigTasks {
  readonly resources: {
    /** パフォーマーを再講読するタスクのリソース名. Can be computed by tasks.queuePath() */
    readonly resubscription: string;
  };
}

export type LoggerType = 'console' | 'cloud-logging';

export interface IConfigLogger {
  readonly type: LoggerType;
}

export interface IConfigSecrets {
  readonly passwordSalt: string;
}

export interface IConfigAdmin {
  readonly emails: string[];
}

export type SessionStore = 'firestore' | 'memory';

export interface IConfigSession {
  readonly store: SessionStore;
  readonly secret: string;
}

export interface IConfig {
  readonly youtube: IConfigYoutube;
  readonly storage: IConfigStorage;
  readonly server: IConfigServer;
  readonly logger: IConfigLogger;
  readonly tasks: IConfigTasks;
  readonly secrets: IConfigSecrets;
  readonly admin: IConfigAdmin;
  readonly session: IConfigSession;
}

// TODO: メソッドにしたい
const resolvePath = (config: IConfig, pathname: string) => {
  const origin = new URL(config.server.origin);
  origin.pathname = pathname;
  return origin.toString();
};

export const utils = {
  resolvePath,
};
