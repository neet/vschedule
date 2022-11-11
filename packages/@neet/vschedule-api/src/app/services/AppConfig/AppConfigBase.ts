/* eslint-disable import/no-unresolved */
import { PartialDeep } from 'type-fest';

import { IAppConfig } from './AppConfig';

abstract class __AppConfigBase {
  private readonly entries: IAppConfig;

  public constructor(entries: PartialDeep<IAppConfig>) {
    this.entries = {
      storage: {
        type: entries.storage?.type ?? 'filesystem',
        bucket: entries.storage?.bucket ?? 'ril',
      },
      tasks: {
        resources: {
          resubscription: entries.tasks?.resources?.resubscription ?? '',
        },
      },
      youtube: {
        dataApiKey: entries.youtube?.dataApiKey,
        websubHmacSecret: entries.youtube?.websubHmacSecret,
      },
      server: {
        port: entries.server?.port ?? 3000,
        origin: entries.server?.origin ?? 'http://localhost:3000',
      },
      logger: {
        type: entries.logger?.type ?? 'console',
      },
    };

    return new Proxy(this, {
      get(target, property, _receiver) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (target.entries as any)[property];
      },
    });
  }
}

// -- Cast for proxy --
type AbstractCtor = abstract new (
  ...args: ConstructorParameters<typeof __AppConfigBase>
) => IAppConfig;

const AppConfigBase = __AppConfigBase as unknown as AbstractCtor;
export { AppConfigBase };
