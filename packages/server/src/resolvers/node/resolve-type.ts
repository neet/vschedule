import * as G from 'src/generated/graphql';

export const resolveType: G.NodeResolvers['__resolveType'] = () => {
  throw Error('Always provide __typename for Node implementations');
};
