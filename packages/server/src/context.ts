import { Connection } from 'typeorm';
import DataLoader from 'dataloader';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import { ActivityRepository } from './repository/activity';
import { CategoryRepostiory } from './repository/category';
import { PerformerRepository } from './repository/performer';
import { TeamRepository } from './repository/team';
import { TwitterAccountRepository } from './repository/twitter-account';
import { YoutubeAccountRepository } from './repository/youtube-account';

// prettier-ignore
export const createContext = (
  connection: Connection,
  elasticsearch: ElasticsearchClient,
) => {
  const activity = connection.getCustomRepository(ActivityRepository);
  const category = connection.getCustomRepository(CategoryRepostiory);
  const performer = connection.getCustomRepository(PerformerRepository);
  const team = connection.getCustomRepository(TeamRepository);
  const twitterAccount = connection.getCustomRepository(TwitterAccountRepository);
  const youtubeAccount = connection.getCustomRepository(YoutubeAccountRepository);

  return {
    connection,
    elasticsearch,
    repositories: {
      activity,
      category,
      performer,
      team,
      twitterAccount,
      youtubeAccount,
    },
    loaders: {
      activity: new DataLoader((ids: readonly string[]) => activity.find(ids)),
      category: new DataLoader((ids: readonly string[]) => category.find(ids)),
      performer: new DataLoader((ids: readonly string[]) => performer.find(ids)),
      team: new DataLoader((ids: readonly string[]) => team.find(ids)),
    }
  };
};

export type Context = ReturnType<typeof createContext>;
