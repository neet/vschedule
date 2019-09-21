import * as G from 'src/generated/graphql';
import { root } from './root';
import { teams } from './teams';
import { members } from './members';

export const team: G.Resolvers = {
  Query: {
    team: root,
    teams,
  },
  Team: {
    members,
  },
};
