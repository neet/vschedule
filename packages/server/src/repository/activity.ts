import DataLoader from 'dataloader';
import { Cursor } from 'src/utils/cursor';
import { EntityRepository, EntityManager } from 'typeorm';
import { Activity } from 'src/entity/activity';
import { matchTeamFromPerformerIds } from 'src/utils/teams';
import { Event, LiverRelationships } from '@ril/gateway';
import { PerformerRepository } from './performer';
import { CategoryRepostiory } from './category';
import { TeamRepository } from './team';

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
      .leftJoinAndSelect('activity.team', 'team')
      .whereInIds(ids)
      .getMany();
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
      .leftJoinAndSelect('activity.team', 'team')
      .orderBy('activity.startAt', order)
      .take(Math.min(take, 100));

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

  search = async (query: string) => {
    return this.manager
      .getRepository(Activity)
      .createQueryBuilder('activity')
      .where("activity.name LIKE '%:query%'", { query })
      .orWhere("activity.description LIKE '%:query%'", { query })
      .take(10)
      .getMany();
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
          .createFromDataset(teamDataset)
      : undefined;

    return this.manager.save(activity);
  };
}
