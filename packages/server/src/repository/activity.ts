import DataLoader from 'dataloader';
import { Cursor } from 'src/utils/cursor';
import { EntityRepository, EntityManager } from 'typeorm';
import { Activity } from 'src/entity/activity';
import { Event, LiverRelationships } from '@ril/gateway';
import { PerformerRepository } from './performer';
import { CategoryRepostiory } from './category';

interface GetAllAndCountParams {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}

@EntityRepository(Activity)
export class ActivityRepository {
  constructor(private readonly manager: EntityManager) {}

  find = new DataLoader<string, Activity>(ids => {
    return this.manager
      .getRepository(Activity)
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.category', 'category')
      .leftJoinAndSelect('activity.performers', 'performer')
      .whereInIds(ids)
      .getMany();
    // .leftJoinAndSelect('activity.team', 'team')
  });

  getAllAndCount = async (params: GetAllAndCountParams) => {
    const { first, last, before, after } = params;
    const take = (last ? last : first) || 100;
    const order = last ? 'DESC' : 'ASC';

    const query = this.manager
      .getRepository(Activity)
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.category', 'category')
      .leftJoinAndSelect('activity.performers', 'performer')
      .orderBy('activity.startAt', order)
      .take(Math.min(take, 100));
    // .leftJoinAndSelect('activity.team', 'team')

    if (before) {
      const { id } = Cursor.decode(before);
      query.orWhere('activity.id < :id', { id });
    }

    if (after) {
      const { id } = Cursor.decode(after);
      query.orWhere('activity.id > :id', { id });
    }

    return await query.getManyAndCount();
  };

  createFromGatewayData = async (
    data: Event,
    liverReationships: LiverRelationships[],
  ) => {
    const activity = new Activity();

    activity.id = data.id.toString();
    activity.name = data.name;
    activity.description = data.description;
    activity.public = data.public;
    activity.url = data.url;
    activity.thumbnail = data.thumbnail;
    activity.startAt = data.start_date;
    activity.endAt = data.end_date;

    activity.performers = await Promise.all(
      liverReationships.map(liver => {
        return this.manager
          .getCustomRepository(PerformerRepository)
          .createFromGatewayData(liver);
      }),
    );

    activity.category = data.genre
      ? await this.manager
          .getCustomRepository(CategoryRepostiory)
          .createFromGatewayData(data.genre)
      : undefined;

    return this.manager.save(activity);
  };
}
