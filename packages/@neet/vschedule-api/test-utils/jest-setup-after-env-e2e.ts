/* eslint-disable no-console */
import 'reflect-metadata';
import '@quramy/jest-prisma-node';

import assert from 'assert';

import { TYPES } from '../src/types';
import { getTestDbConfig } from './db-uri';
import { container } from './inversify-config';

assert(process.env.DATABASE_URL != null);
const testDb = getTestDbConfig(process.env.DATABASE_URL);

beforeEach(() => {
  // Mock DATABASE_URL
  process.env.DATABASE_URL = testDb.uri;

  const prisma = jestPrisma.client;
  container.rebind(TYPES.PrismaClient).toConstantValue(prisma);
});
