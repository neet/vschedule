import * as G from 'src/generated/graphql';
import { root } from './root';
import { categories } from './categories';

export const category: G.Resolvers = {
  Query: {
    category: root,
    categories,
  },
};
