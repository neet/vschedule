import { PrismaClient } from '@prisma/client';
import assert from 'assert';

import { getTestDbConfig } from './db-uri';

export default async (): Promise<void> => {
  assert(process.env.DATABASE_URL != null);
  const testDb = getTestDbConfig(process.env.DATABASE_URL);

  // Mock DATABASE_URL
  process.env.DATABASE_URL = testDb.uri;

  const client = new PrismaClient();
  try {
    await client.$executeRawUnsafe(`DROP DATABASE ${testDb.name}`);
  } finally {
    await client.$disconnect();
  }
};
