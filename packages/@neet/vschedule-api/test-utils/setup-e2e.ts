/* eslint-disable no-console */
import 'reflect-metadata';
import '@quramy/jest-prisma-node';

import execa from 'execa';
import path from 'path';

import { TYPES } from '../src/types';
import { container } from './inversify-config';
import { createSeed } from './seed';

// For some reasons, testTimeout in jest.config did not work
// https://github.com/facebook/jest/issues/9696
jest.setTimeout(1000 * 60 * 1);

beforeAll(async () => {
  // console.log('$ prisma migrate reset');
  await execa('prisma', ['migrate', 'reset', '--force', '--skip-seed'], {
    preferLocal: true,
    stdio: 'pipe',
    cwd: path.join(__dirname, '..'),
  });

  // console.log('$ prisma db seed');
  await createSeed();
});

beforeEach(() => {
  container.rebind(TYPES.PrismaClient).toConstantValue(jestPrisma.client);
});
