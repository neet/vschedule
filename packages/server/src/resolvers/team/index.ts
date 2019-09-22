import * as G from 'src/generated/graphql';
import { rootTeam } from './root-team';
import { rootTeams } from './root-teams';
import { members } from './members';

export const team: G.Resolvers = {
  Query: {
    team: rootTeam,
    teams: rootTeams,
  },
  Team: {
    members,
  },
};
