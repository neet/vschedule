import { ConfigBase, IConfig } from '../app';

const env = <T = string>(name: string): T | undefined => {
  return process.env[name] as T | undefined;
};

export class ConfigEnvironment extends ConfigBase implements IConfig {
  public constructor() {
    super({
      youtube: {
        dataApiKey: env('YOUTUBE_DATA_API_KEY'),
        websubHmacSecret: env('YOUTUBE_WEBSUB_HMAC_SECRET'),
        websubVerifyToken: env('YOUTUBE_WEBSUB_VERIFY_TOKEN'),
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
      tasks: {
        resources: {
          resubscription: env('TASKS_RESUBSCRIPTION_RESOURCE'),
        },
      },
      secrets: {
        passwordSalt: env('PASSWORD_SALT'),
      },
      logger: {
        type: env('LOGGER_TYPE'),
      },
      admin: {
        emails: env('ADMIN_EMAILS')?.split(','),
      },
      session: {
        store: env('SESSION_STORE'),
        secret: env('SESSION_SECRET'),
      },
    });
  }
}
