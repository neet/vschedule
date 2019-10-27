import * as G from 'src/generated/graphql';
import { serializePerformer } from 'src/serializers/performer';
import { createPageInfo } from 'src/utils/create-page-info';

export const rootPerformers: G.QueryResolvers['performers'] = async (
  _parent,
  { input },
  { repositories },
) => {
  const [performers, count] = await repositories.performer.getAllAndCount(
    input,
  );
  const nodes = performers.map(performer => serializePerformer(performer));

  return {
    nodes,
    pageInfo: createPageInfo(nodes, count, input),
  };
};
