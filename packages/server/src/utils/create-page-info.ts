import { PageInfo, Node } from 'src/generated/graphql';

interface AnyEdge {
  cursor: string;
  node: Node;
}

interface PaginationOptions {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
}

export const createPageInfo = (
  edges: AnyEdge[],
  totalCount: number,
  options: PaginationOptions,
): PageInfo => {
  const hasPreviousPage = options.before ? edges.length < totalCount : false;
  const hasNextPage = !options.before ? edges.length < totalCount : false;
  const startCursor = edges.length ? edges[0].cursor : undefined;
  const endCursor = edges.length
    ? edges[Math.max(edges.length - 1, 0)].cursor
    : undefined;

  return {
    hasNextPage,
    hasPreviousPage,
    startCursor,
    endCursor,
    totalCount,
  };
};
