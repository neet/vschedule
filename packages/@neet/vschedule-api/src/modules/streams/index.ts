import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { StreamQueryServicePrisma } from './adapters/stream-query-service-prisma';
import { StreamRepositoryPrisma } from './adapters/stream-repository-prisma';
import { IStreamQueryService } from './app/stream-query-service';
import { IStreamRepository } from './domain';

export const streamsContainer = new ContainerModule((bind) => {
  bind<IStreamRepository>(TYPES.StreamRepository).to(StreamRepositoryPrisma);
  bind<IStreamQueryService>(TYPES.StreamQueryService).to(
    StreamQueryServicePrisma,
  );
});

export * from './adapters';
export * from './app';
export * from './domain';
