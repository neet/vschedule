import { z } from 'zod';

import { registry } from '../../api';
import { Actor } from './Actor';

export const Organization = registry.register('Organization', Actor.extend({}));
