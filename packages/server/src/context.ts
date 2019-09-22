import { Connection } from 'typeorm';
import { ActivityRepository } from './repository/activity';
import { CategoryRepostiory } from './repository/category';
import { PerformerRepository } from './repository/performer';
import { TeamRepository } from './repository/team';
import { TwitterAccountRepository } from './repository/twitter-account';
import { YoutubeAccountRepository } from './repository/youtube-account';

export interface Context {
  connection: Connection;
  repositories: {
    activity: ActivityRepository;
    category: CategoryRepostiory;
    performer: PerformerRepository;
    team: TeamRepository;
    twitterAccount: TwitterAccountRepository;
    youtubeAccount: YoutubeAccountRepository;
  };
}

export const createContext = (connection: Connection): Context => {
  return {
    connection,
    repositories: {
      activity: connection.getCustomRepository(ActivityRepository),
      category: connection.getCustomRepository(CategoryRepostiory),
      performer: connection.getCustomRepository(PerformerRepository),
      team: connection.getCustomRepository(TeamRepository),
      twitterAccount: connection.getCustomRepository(TwitterAccountRepository),
      youtubeAccount: connection.getCustomRepository(YoutubeAccountRepository),
    },
  };
};
