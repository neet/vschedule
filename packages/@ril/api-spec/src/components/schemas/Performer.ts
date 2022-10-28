import { registry } from '../../api';
import { Actor } from './Actor';
import { Organization } from './Organization';

export const Performer = registry.register(
  'Performer',
  Actor.extend({
    organization: Organization.optional(),
  }),
);
