import * as G from 'src/generated/graphql';
import { serializePerformer } from 'src/serializers/performer';
import { serializeActivity } from 'src/serializers/activity';
import { serializeTeam } from 'src/serializers/team';

export const rootSearch: G.QueryResolvers['search'] = async (
  _,
  { query },
  { repositories },
) => {
  const activities = await repositories.activity
    .search(query)
    .then(performers => performers.map(serializeActivity));

  const performers = await repositories.performer
    .search(query)
    .then(performers => performers.map(serializePerformer));

  const teams = await repositories.team
    .search(query)
    .then(teams => teams.map(serializeTeam));

  const categories = await repositories.category.search(query);

  return {
    performers,
    activities,
    teams,
    categories,
  };
};
