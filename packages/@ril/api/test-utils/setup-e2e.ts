import 'reflect-metadata';

import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
import RelativeTimePlugin from 'dayjs/plugin/relativeTime';
import execa from 'execa';
import path from 'path';

import { container } from '../src/infra/inversify-config';
import { TYPES } from '../src/types';
import { installSeed } from './seed';

// For some reasons, testTimeout in jest.config did not work
// https://github.com/facebook/jest/issues/9696
jest.setTimeout(1000 * 60 * 1);

beforeAll(async () => {
  dayjs.extend(DurationPlugin);
  dayjs.extend(RelativeTimePlugin);
  await execa('prisma', ['migrate', 'reset', '--force', '--skip-seed'], {
    preferLocal: true,
    stdio: 'pipe',
    cwd: path.join(__dirname, '..'),
  });
  await installSeed();
});

afterAll(async () => {
  const prisma = container.get<PrismaClient>(TYPES.PrismaClient);
  await prisma.$disconnect();
});
