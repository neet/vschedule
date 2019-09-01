import path from 'path';
import {
  createConnection as defaultCreateConnection,
  ConnectionOptionsReader,
} from 'typeorm';

// Workaround for TypeORM + Monorepo issue:
// https://github.com/inxilpro/node-app-root-path/issues/31#issuecomment-439739607
export const createConnection = async () => {
  // When you invoke JS through `yarn workspace <ws> run` you'll get
  // the leaf's dir from `process.cwd()`
  // i.e `<your project dir>/packages/server` in this case.
  const cwd = process.cwd();

  const connectionOptionsReader = new ConnectionOptionsReader({
    root: cwd,
  });
  const connectionOptions = await connectionOptionsReader.get('default');

  const connection = await defaultCreateConnection({
    ...connectionOptions,
    entities: [path.join(cwd, './src/entity/**/*.ts')],
    migrations: [path.join(cwd, './src/migration/**/*.ts')],
    subscribers: [path.join(cwd, './src/subscriber/**/*.ts')],
  });

  return connection;
};
