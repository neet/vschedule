import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
import { getCustomRepository } from 'typeorm';
import { PerformerRepository } from 'src/repository/performer';
import { serializePerformer } from 'src/serializers/performer';
import { createPageInfo } from 'src/utils/create-page-info';

export const performers: G.QueryResolvers['performers'] = async (
  _parent,
  args,
) => {
  // prettier-ignore
  const [performers, count] = await getCustomRepository(PerformerRepository)
    .getAllAndCount(args)

  const edges = performers.map(performer => ({
    cursor: Cursor.encode('Performer', performer.id),
    node: serializePerformer(performer),
  }));

  return {
    edges,
    nodes: edges.map(edge => edge.node),
    pageInfo: createPageInfo(edges, count, args),
  };
};
