import 'reflect-metadata';

import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
import RelativeTimePlugin from 'dayjs/plugin/relativeTime';

import { container } from '../src/infra/inversify-config';
import { TYPES } from '../src/types';

beforeAll(() => {
  dayjs.extend(DurationPlugin);
  dayjs.extend(RelativeTimePlugin);
});

afterAll(async () => {
  const prisma = container.get<PrismaClient>(TYPES.PrismaClient);
  await prisma.$disconnect();
});
