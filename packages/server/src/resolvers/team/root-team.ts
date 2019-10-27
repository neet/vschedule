import * as G from 'src/generated/graphql';
import { serializeTeam } from 'src/serializers/team';

export const rootTeam: G.QueryResolvers['team'] = async (
  _parent,
  { id },
  { loaders },
) => {
  const team = await loaders.team.load(id).then(serializeTeam);

  return team;
};
