import * as G from 'src/generated/graphql';
import { root } from './root';
import { performers } from './performers';
import { socialAccounts } from './social-accounts';
import { teams } from './teams';

export const performer: G.Resolvers = {
  Query: {
    performer: root,
    performers,
  },
  Performer: {
    socialAccounts,
    teams,
  },
};
