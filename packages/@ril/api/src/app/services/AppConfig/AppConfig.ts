export interface IAppConfigYoutube {
  readonly dataApiKey?: string;
  readonly webSubEnabled?: boolean;
  readonly webSubHmacSecret?: string;
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

export interface IAppConfigEntries {
  readonly youtube: IAppConfigYoutube;
  readonly storage: IAppConfigStorage;
  readonly server: IAppConfigServer;
}

export interface IAppConfig {
  readonly entries: IAppConfigEntries;
}
