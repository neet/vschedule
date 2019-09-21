import * as G from 'src/generated/graphql';
import merge from 'deepmerge';
import { activity } from './activity';
import { category } from './category';
import { performer } from './performer';
import { team } from './team';

export const resolvers: G.Resolvers = merge.all([
  activity,
  category,
  performer,
  team,
]);
