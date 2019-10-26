import { PageInfo } from 'src/generated/graphql';

interface PaginationInput {
  offset?: number;
}

export const createPageInfo = <T extends PaginationInput>(
  nodes: unknown[],
  totalCount: number,
  input: T = {} as T,
): PageInfo => {
  const { offset = 0 } = input;

  const hasNextPage = nodes.length + offset < totalCount;
  const hasPreviousPage = offset < totalCount;

  return {
    hasNextPage,
    hasPreviousPage,
    totalCount,
  };
};
