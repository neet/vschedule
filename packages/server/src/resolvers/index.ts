import * as G from 'src/generated/graphql';
import merge from 'deepmerge';
import { category } from './category';
import { performer } from './performer';
import { team } from './team';

export const resolvers: G.Resolvers = merge.all([category, performer, team]);
