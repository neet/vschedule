import * as G from 'src/generated/graphql';
import { serializeCategory } from 'src/serializers/category';

export const rootCategory: G.QueryResolvers['category'] = async (
  _parent,
  { id },
  { repositories },
) => {
  const category = await repositories.category.find
    .load(id)
    .then(serializeCategory);

  return category;
};
