// import DataLoader from 'dataloader';
import { EntityRepository, EntityManager } from 'typeorm';
import { YoutubeAccount } from 'src/entity/youtube-account';

@EntityRepository(YoutubeAccount)
export class YoutubeAccountRepository {
  constructor(private readonly manager: EntityManager) {}

  findByPerformerId = (id: string) => {
    return this.manager
      .getRepository(YoutubeAccount)
      .createQueryBuilder('youtubeAccount')
      .leftJoin('youtubeAccount.performer', 'performer')
      .where('performer.id = :id', { id })
      .getMany();
  };
}
