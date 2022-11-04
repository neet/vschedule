import '@quramy/jest-prisma';

import { PrismaClient } from '@prisma/client';

import { IYoutubeWebsubService } from '../src/app/services/YoutubeWebsubService';
import { container } from '../src/infra/inversify-config';
import { TYPES } from '../src/types';

const websubService: IYoutubeWebsubService = {
  subscribeToChannel: jest.fn().mockResolvedValue(undefined),
};
container.rebind(TYPES.YoutubeWebsubService).toConstantValue(websubService);

container.rebind(TYPES.PrismaClient).toConstantValue(new PrismaClient());

export { container };
