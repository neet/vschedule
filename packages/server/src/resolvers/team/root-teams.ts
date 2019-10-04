import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
import { createPageInfo } from 'src/utils/create-page-info';
import { serializeTeam } from 'src/serializers/team';

export const rootTeams: G.QueryResolvers['teams'] = async (
  _parent,
  { input },
  { repositories },
) => {
  const [teams, count] = await repositories.team.getAllAndCount(input);

  const edges = teams.map(team => ({
    cursor: Cursor.encode('Team', team.id),
    node: serializeTeam(team),
  }));

  return {
    edges,
    nodes: edges.map(edge => edge.node),
    pageInfo: createPageInfo(edges, count, input),
  };
};
