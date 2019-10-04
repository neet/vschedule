import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
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

  const edges = performers.map(performer => ({
    cursor: Cursor.encode('Performer', performer.id),
    node: serializePerformer(performer),
  }));

  return {
    edges,
    nodes: edges.map(edge => edge.node),
    pageInfo: createPageInfo(edges, count, input),
  };
};
