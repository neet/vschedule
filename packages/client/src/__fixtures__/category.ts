import * as G from 'src/generated/graphql';

export const category = ({
  id: '1',
  name: 'ゲーム',
  activities: {
    pageInfo: {
      totalCount: 1200,
    },
  },
} as any) as G.CategoryFragment;
