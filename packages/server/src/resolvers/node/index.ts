import * as G from 'src/generated/graphql';
import { rootNode } from './root-node';

export const node: G.Resolvers = {
  Query: {
    node: rootNode,
  },
};
