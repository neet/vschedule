// import DataLoader from 'dataloader';
import { EntityRepository, EntityManager } from 'typeorm';
import { TwitterAccount } from 'src/entity/twitter-account';

@EntityRepository(TwitterAccount)
export class TwitterAccountRepository {
  constructor(private readonly manager: EntityManager) {}

  findByPerformerId = (id: string) => {
    return this.manager
      .getRepository(TwitterAccount)
      .createQueryBuilder('twitterAccount')
      .leftJoin('twitterAccount.performer', 'performer')
      .where('performer.id = :id', { id })
      .getMany();
  };
}
