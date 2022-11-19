import 'reflect-metadata';

import { PrismaClient } from '@prisma/client';
import assert from 'assert';
import execa from 'execa';
import path from 'path';

import { IConfig } from '../src/app';
import { TYPES } from '../src/types';
import { createSeed } from './db-seed';
import { getTestDbConfig } from './db-uri';
import { container } from './inversify-config';

export default async (): Promise<void> => {
  assert(process.env.DATABASE_URL != null);
  const testDb = getTestDbConfig(process.env.DATABASE_URL);

  // CREATE DATABASE;
  if (testDb.shouldCreate) {
    const client = new PrismaClient();
    try {
      await client.$executeRawUnsafe(`CREATE DATABASE ${testDb.name}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Mock DATABASE_URL
  process.env.DATABASE_URL = testDb.uri;

  // Run migration
  await execa('prisma', ['migrate', 'reset', '--force', '--skip-seed'], {
    preferLocal: true,
    stdio: 'pipe',
    cwd: path.join(__dirname, '..'),
  });

  // Seed
  const config = container.get<IConfig>(TYPES.Config);
  await createSeed(config);
};
