import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
import { getCustomRepository } from 'typeorm';
import { createPageInfo } from 'src/utils/create-page-info';
import { TeamRepository } from 'src/repository/team';
import { serializeTeam } from 'src/serializers/team';

export const teams: G.QueryResolvers['teams'] = async (_parent, args) => {
  // prettier-ignore
  const [teams, count] = await getCustomRepository(TeamRepository)
    .getAllAndCount(args)

  const edges = teams.map(team => ({
    cursor: Cursor.encode('Team', team.id),
    node: serializeTeam(team),
  }));

  return {
    edges,
    nodes: edges.map(edge => edge.node),
    pageInfo: createPageInfo(edges, count, args),
  };
};
