import * as G from 'src/generated/graphql';
import { getCustomRepository } from 'typeorm';
import { YoutubeAccountRepository } from 'src/repository/youtube-account';
import { TwitterAccountRepository } from 'src/repository/twitter-account';

export const socialAccounts: G.PerformerResolvers['socialAccounts'] = async parent => {
  // prettier-ignore
  const youtubeAccounts = await getCustomRepository(YoutubeAccountRepository)
    .findByPerformerId(parent.id);
  // prettier-ignore
  const twitterAccounts = await getCustomRepository(TwitterAccountRepository)
    .findByPerformerId(parent.id);

  return [...youtubeAccounts, ...twitterAccounts];
};
