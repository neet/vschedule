/* eslint-disable import/no-unresolved */
import assert from 'assert';
import { genSaltSync } from 'bcryptjs';
import { PartialDeep } from 'type-fest';

import { IAppConfig } from './app-config';

abstract class $AppConfigBase {
  private readonly entries: IAppConfig;

  public constructor(input: PartialDeep<IAppConfig>) {
    assert(
      input.youtube?.dataApiKey != null,
      'youtube.dataApiKey cannot be null ',
    );

    this.entries = {
      storage: {
        type: input.storage?.type ?? 'filesystem',
        bucket: input.storage?.bucket ?? 'ril',
      },
      tasks: {
        resources: {
          resubscription: input.tasks?.resources?.resubscription ?? '/',
        },
      },
      youtube: {
        dataApiKey: input.youtube.dataApiKey,
        websubHmacSecret: input.youtube.websubHmacSecret ?? 'secret',
        websubVerifyToken: input.youtube.websubVerifyToken ?? 'token',
      },
      server: {
        port: input.server?.port ?? 3000,
        origin: input.server?.origin ?? 'http://localhost:3000',
      },
      secrets: {
        passwordSalt: input.secrets?.passwordSalt ?? genSaltSync(),
      },
      logger: {
        type: input.logger?.type ?? 'console',
      },
      admin: {
        emails: input.admin?.emails ?? [],
      },
      session: {
        secret: input.session?.secret ?? 'secret',
        store: input.session?.store ?? 'memory',
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
  ...args: ConstructorParameters<typeof $AppConfigBase>
) => IAppConfig;

const AppConfigBase = $AppConfigBase as unknown as AbstractCtor;
export { AppConfigBase };
