import * as G from 'src/generated/graphql';
import { createPageInfo } from 'src/utils/create-page-info';
import { serializeTeam } from 'src/serializers/team';

export const rootTeams: G.QueryResolvers['teams'] = async (
  _parent,
  { input },
  { repositories },
) => {
  const [teams, count] = await repositories.team.getAllAndCount(input);
  const nodes = teams.map((team) => serializeTeam(team));

  return {
    nodes,
    pageInfo: createPageInfo(nodes, count, input),
  };
};
