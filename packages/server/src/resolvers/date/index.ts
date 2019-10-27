import * as G from 'src/generated/graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

export const date: G.Resolvers = {
  Date: GraphQLDateTime,
};
