import * as G from 'src/generated/graphql';
import { createPageInfo } from 'src/utils/create-page-info';
import { serializeCategory } from 'src/serializers/category';

export const rootCategories: G.QueryResolvers['categories'] = async (
  _parent,
  input,
  { repositories },
) => {
  const [categories, count] = await repositories.category.getAllAndCount(input);
  const nodes = categories.map(category => serializeCategory(category));

  return {
    nodes,
    pageInfo: createPageInfo(nodes, count, input),
  };
};
