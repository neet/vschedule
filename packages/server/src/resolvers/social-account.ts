import * as G from 'src/generated/graphql';

export const SocialAccount: G.SocialAccountResolvers = {
  __resolveType: parent => {
    if ('screenName' in parent) {
      return 'TwitterAccount';
    }

    return 'YoutubeAccount';
  },
};
