/* eslint-disable no-console */
import 'reflect-metadata';
import '@quramy/jest-prisma-node';

import { TYPES } from '../src/types';
import { container } from './inversify-config';

beforeEach(() => {
  const prisma = jestPrisma.client;
  container.rebind(TYPES.PrismaClient).toConstantValue(prisma);
});
