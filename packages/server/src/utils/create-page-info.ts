import { PageInfo, Node } from 'src/generated/graphql';

interface AnyEdge {
  cursor: string;
  node: Partial<Pick<Node, 'id'>>;
}

interface PaginationInput {
  first?: number;
  last?: number;
  after?: string;
  before?: string;
}

export const createPageInfo = <T extends PaginationInput>(
  edges: AnyEdge[],
  totalCount: number,
  input: T = {} as T,
  befores: (keyof T)[] = ['before'],
): PageInfo => {
  const wasCalledWithBefore = befores.some(before => {
    return before in input;
  });

  const hasPreviousPage = wasCalledWithBefore
    ? edges.length < totalCount
    : false;

  // prettier-ignore
  const hasNextPage = !wasCalledWithBefore
    ? edges.length < totalCount
    : false;

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
