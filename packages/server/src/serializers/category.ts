import { Category } from 'src/entity/category';
import * as G from 'src/generated/graphql';
import { Serialized } from './serializers';

export const serializeCategory = (
  entity: Category,
): Serialized<G.Category, 'activities'> => {
  return {
    ...entity,
    activities: undefined,
  };
};
