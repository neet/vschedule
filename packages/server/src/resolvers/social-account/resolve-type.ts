import * as G from 'src/generated/graphql';

export const resolveType: G.SocialAccountResolvers['__resolveType'] = (
  parent,
) => {
  if ('screenName' in parent) {
    return 'TwitterAccount';
  }

  return 'YoutubeAccount';
};
