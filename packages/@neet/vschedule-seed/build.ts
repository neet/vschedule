import fs from 'node:fs/promises';

import glob from 'glob';
import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';
import toml from 'toml';

const main = async (): Promise<void> => {
  rimraf.sync('./dist');
  mkdirp.sync('./dist');

  const files = glob.sync(path.resolve(__dirname, './src/**/*.toml'));

  for (const file of files) {
    const source = await fs.readFile(file, 'utf-8');
    const object = toml.parse(source);

    const filename = path
      .basename(file)
      .replace(path.extname(file), '')
      .concat('.json');

    await fs.writeFile(
      path.resolve(__dirname, './dist', filename),
      JSON.stringify(object, null, 2),
      'utf-8',
    );
  }
};

main().catch((error) => {
  throw error;
});
