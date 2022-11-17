import 'reflect-metadata';

import execa from 'execa';
import path from 'path';

import { createSeed } from './seed';

export default async (): Promise<void> => {
  await execa('prisma', ['migrate', 'reset', '--force', '--skip-seed'], {
    preferLocal: true,
    stdio: 'pipe',
    cwd: path.join(__dirname, '..'),
  });

  await createSeed();
};
