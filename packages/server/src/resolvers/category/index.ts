import * as G from 'src/generated/graphql';
import { rootCategory } from './root-category';
import { rootCategories } from './root-categories';
import { activities } from './activities';

export const category: G.Resolvers = {
  Query: {
    category: rootCategory,
    categories: rootCategories,
  },
  Category: {
    activities,
  },
};
