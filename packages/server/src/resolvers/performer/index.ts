import * as G from 'src/generated/graphql';
import { rootPerformer } from './root-performer';
import { rootPerformers } from './root-performers';
import { socialAccounts } from './social-accounts';
import { teams } from './teams';

export const performer: G.Resolvers = {
  Query: {
    performer: rootPerformer,
    performers: rootPerformers,
  },
  Performer: {
    socialAccounts,
    teams,
  },
};
