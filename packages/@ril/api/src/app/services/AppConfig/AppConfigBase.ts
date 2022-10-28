/* eslint-disable import/no-unresolved */
import { PartialDeep } from 'type-fest';

import { IAppConfig, IAppConfigEntries } from './AppConfig';

export abstract class AppConfigBase implements IAppConfig {
  public readonly entries: IAppConfigEntries;

  public constructor(entries: PartialDeep<IAppConfigEntries>) {
    this.entries = {
      storage: {
        type: entries.storage?.type ?? 'filesystem',
        bucket: entries.storage?.bucket ?? 'ril',
      },
      youtube: {
        dataApiKey: entries.youtube?.dataApiKey,
        webSubEnabled: entries.youtube?.webSubEnabled,
        webSubHmacSecret: entries.youtube?.webSubHmacSecret,
      },
      server: {
        port: entries.server?.port ?? 3000,
        origin: entries.server?.origin ?? 'http://localhost:3000',
      },
    };
  }
}
