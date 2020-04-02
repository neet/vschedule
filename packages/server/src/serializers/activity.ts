import * as G from 'src/generated/graphql';
import { Activity } from 'src/entity/activity';
import { Serialized } from './serializers';
import { serializeCategory } from './category';
import { serializePerformer } from './performer';
import { serializeTeam } from './team';

export const serializeActivity = (
  entity: Activity,
): Serialized<G.Activity, 'category' | 'performers' | 'team'> => {
  return {
    ...entity,
    category: entity.category && serializeCategory(entity.category),
    performers:
      entity.performers &&
      entity.performers.map((performer) => serializePerformer(performer)),
    team: entity.team && serializeTeam(entity.team),
  };
};
