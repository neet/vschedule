import { injectable } from 'inversify';

import { IAppConfig } from '../../app/services/AppConfig/AppConfig';
import { AppConfigBase } from '../../app/services/AppConfig/AppConfigBase';

const env = <T = string>(name: string): T | undefined => {
  return process.env[name] as T | undefined;
};

@injectable()
export class AppConfigEnvironment extends AppConfigBase implements IAppConfig {
  public constructor() {
    super({
      youtube: {
        websubEnabled: env('YOUTUBE_WEBSUB_ENABLED'),
        websubHmacSecret: env('YOUTUBE_WEBSUB_HMAC_SECRET'),
        dataApiKey: env('YOUTUBE_DATA_API_KEY'),
      },
      storage: {
        type: env('STORAGE_TYPE'),
        bucket: env('STORAGE_BUCKET'),
      },
      server: {
        port: (() => {
          const port = env('PORT');
          return port ? Number(port) : undefined;
        })(),
        origin: env('ORIGIN'),
      },
      logger: {
        type: env('LOGGER_TYPE'),
      },
    });
  }
}
