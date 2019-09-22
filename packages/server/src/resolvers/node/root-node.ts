import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
import { serializePerformer } from 'src/serializers/performer';
import { serializeActivity } from 'src/serializers/activity';
import { serializeTeam } from 'src/serializers/team';

export const rootNode: G.QueryResolvers['node'] = (
  _parent,
  { cursor },
  { repositories },
) => {
  const { typename, id } = Cursor.decode(cursor);

  switch (typename) {
    case 'Activity':
      return repositories.activity.find.load(id).then(serializeActivity);
    case 'Category':
      return repositories.category.find.load(id);
    case 'Performer':
      return repositories.performer.find.load(id).then(serializePerformer);
    case 'Team':
      return repositories.team.find.load(id).then(serializeTeam);
    default:
      throw new Error('Unexpected typename');
  }
};
