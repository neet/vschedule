import * as G from 'src/generated/graphql';
import { serializeCategory } from 'src/serializers/category';

export const rootCategory: G.QueryResolvers['category'] = async (
  _parent,
  { id },
  { loaders },
) => {
  const category = await loaders.category.load(id).then(serializeCategory);

  return category;
};
