import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { YoutubeWebsubParser } from '../services/youtube-websub-parser';
import { Authenticate } from './authenticate';
import { Authenticated } from './authenticated';

export const mw = new ContainerModule((bind) => {
  bind(TYPES.Authenticate).to(Authenticate);
  bind(TYPES.Authenticated).to(Authenticated);
  bind(TYPES.YoutubeWebsubParser).to(YoutubeWebsubParser);
});
