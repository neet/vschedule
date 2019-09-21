import * as G from 'src/generated/graphql';
import { Activity } from 'src/entity/activity';
import { serializePerformer } from './performer';

export const serializeActivity = (entity: Activity): G.Activity => {
  return {
    ...entity,
    performers: entity.performers
      ? entity.performers.map(performer => serializePerformer(performer))
      : [],
  };
};
