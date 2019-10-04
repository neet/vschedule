import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
import { createPageInfo } from 'src/utils/create-page-info';

export const rootCategories: G.QueryResolvers['categories'] = async (
  _parent,
  { input },
  { repositories },
) => {
  const [categories, count] = await repositories.category.getAllAndCount(input);

  const edges = categories.map(category => ({
    cursor: Cursor.encode('Category', category.id),
    node: category,
  }));

  return {
    edges,
    nodes: edges.map(edge => edge.node),
    pageInfo: createPageInfo(edges, count, input),
  };
};
