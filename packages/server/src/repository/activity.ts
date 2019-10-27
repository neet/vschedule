import DataLoader from 'dataloader';
import { EntityRepository, EntityManager } from 'typeorm';
import { Activity } from 'src/entity/activity';
import { matchTeamFromPerformerIds } from 'src/utils/teams';
import { Event, LiverRelationship } from '@ril/gateway';
import { PerformerRepository } from './performer';
import { CategoryRepostiory } from './category';
import { TeamRepository } from './team';

interface GetAllAndCountParams {
  limit?: number;
  offset?: number;
  order?: 'ASC' | 'DESC';
  afterDate?: Date;
  beforeDate?: Date;
  performerId?: string;
  teamId?: string;
  categoryId?: string;
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
      .leftJoinAndSelect('activity.team', 'team')
      .whereInIds(ids)
      .getMany();
  });

  getAllAndCount = async (
    params: GetAllAndCountParams = {},
  ): Promise<[Activity[], number]> => {
    const {
      offset = 0,
      limit = 100,
      order = 'ASC',
      performerId,
      teamId,
      categoryId,
      afterDate,
      beforeDate,
    } = params;

    const query = this.manager
      .getRepository(Activity)
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.category', 'category')
      .leftJoinAndSelect('activity.performers', 'performer')
      .leftJoinAndSelect('activity.team', 'team')
      .orderBy('activity.startAt', order)
      .skip(offset)
      .take(Math.min(limit, 100));

    if (performerId) query.andWhere('performer.id = :id', { id: performerId });
    if (teamId) query.andWhere('team.id = :id', { id: teamId });
    if (categoryId) query.andWhere('category.id = :id', { id: categoryId });

    const count = await query.getCount();

    // `afterDate` and `beforeDate` are used as a pagination
    // so should be added after counting
    if (afterDate) {
      query.andWhere('activity."endAt" > CAST(:afterDate AS TIMESTAMP)', {
        afterDate,
      });
    }

    if (beforeDate) {
      query.andWhere('activity."startAt" < CAST(:beforeDate AS TIMESTAMP)', {
        beforeDate,
      });
    }

    const result = await query.getMany();

    return [result, count];
  };

  createFromGatewayData = async (
    data: Event,
    liverReationships: LiverRelationship[],
  ) => {
    const activity = new Activity();

    activity.id = data.id.toString();
    activity.name = data.name;
    activity.description = data.description;
    activity.public = data.public;
    activity.url = data.url;
    activity.thumbnail = data.thumbnail;
    activity.startAt = new Date(data.start_date);
    activity.endAt = new Date(data.end_date);

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

    const teamDataset = matchTeamFromPerformerIds(
      activity.performers.map(performer => performer.id),
    );

    activity.team = teamDataset
      ? await this.manager
          .getCustomRepository(TeamRepository)
          .find.load(teamDataset.id)
      : undefined;

    return this.manager.save(activity);
  };
}
