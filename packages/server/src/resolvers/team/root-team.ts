import * as G from 'src/generated/graphql';
import { serializeTeam } from 'src/serializers/team';

export const rootTeam: G.QueryResolvers['team'] = async (
  _parent,
  { id },
  { repositories },
) => {
  const team = await repositories.team.find.load(id).then(serializeTeam);

  return team;
};
