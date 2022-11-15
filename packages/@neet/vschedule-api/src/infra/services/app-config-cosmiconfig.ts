import { cosmiconfigSync } from 'cosmiconfig';
import { loadToml } from 'cosmiconfig-toml-loader';
import { injectable } from 'inversify';

import { AppConfigBase, configSchema, IAppConfig } from '../../app';

@injectable()
export class AppConfigConsmiconfig extends AppConfigBase implements IAppConfig {
  constructor() {
    const moduleName = 'vschedule';
    const result = cosmiconfigSync(moduleName, {
      searchPlaces: [`.${moduleName}rc.toml`, `.config/${moduleName}rc.toml`],
      loaders: {
        '.toml': loadToml,
      },
    }).search();

    if (result == null) {
      throw new Error(`No configuration with name ${moduleName} found`);
    }

    const config = configSchema.parse(result.config);

    if (process.env.PORT != null) {
      config.server.port = Number(process.env.PORT);
    }

    super(config);
  }
}
