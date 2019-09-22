import * as G from 'src/generated/graphql';

export const socialAccounts: G.PerformerResolvers['socialAccounts'] = async (
  parent,
  _,
  { repositories },
) => {
  // prettier-ignore
  const youtubeAccounts = await repositories.youtubeAccount
    .findByPerformerId(parent.id);

  // prettier-ignore
  const twitterAccounts = await repositories.twitterAccount
    .findByPerformerId(parent.id);

  return [...youtubeAccounts, ...twitterAccounts];
};
