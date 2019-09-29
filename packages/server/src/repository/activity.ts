import DataLoader from 'dataloader';
import { Cursor } from 'src/utils/cursor';
import { EntityRepository, EntityManager } from 'typeorm';
import { Activity } from 'src/entity/activity';
import { matchTeamFromPerformerIds } from 'src/utils/teams';
import { Event, LiverRelationship } from '@ril/gateway';
import { PerformerRepository } from './performer';
import { CategoryRepostiory } from './category';
import { TeamRepository } from './team';

interface GetAllAndCountParams {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
  startSince?: Date | null;
  performerId?: string | null;
  teamId?: string | null;
  categoryId?: string | null;
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
    const {
      first,
      last,
      before,
      after,
      startSince,
      performerId,
      teamId,
      categoryId,
    } = params;

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
      query.andWhere('activity.id < :id', { id });
    }

    if (after) {
      const { id } = Cursor.decode(after);
      query.andWhere('activity.id > :id', { id });
    }

    if (startSince) {
      query.andWhere('activity."startAt" > :date', { date: startSince });
    }

    if (performerId) {
      query.andWhere('performer.id = :id', { id: performerId });
    }

    if (teamId) {
      query.andWhere('team.id = :id', { id: teamId });
    }

    if (categoryId) {
      query.andWhere('category.id = :id', { id: categoryId });
    }

    return query.getManyAndCount();
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
