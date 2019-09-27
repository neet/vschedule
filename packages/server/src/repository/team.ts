import DataLoader from 'dataloader';
import { Cursor } from 'src/utils/cursor';
import { EntityManager, EntityRepository } from 'typeorm';
import { Team } from 'src/entity/team';
import { TeamDataset } from 'src/utils/teams';
import { PerformerRepository } from './performer';

interface GetAllAndCountParams {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}

@EntityRepository(Team)
export class TeamRepository {
  constructor(private readonly manager: EntityManager) {}

  find = new DataLoader<string, Team>(ids => {
    return this.manager
      .getRepository(Team)
      .createQueryBuilder('team')
      .whereInIds(ids)
      .getMany();
  });

  findByMembership = async (performerId: string) => {
    return this.manager
      .getRepository(Team)
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'member')
      .where('member.id = :id', { id: performerId })
      .getMany();
  };

  search = async (query: string) => {
    return this.manager
      .getRepository(Team)
      .createQueryBuilder('team')
      .where('team.name LIKE :query', { query })
      .getMany();
  };

  getAllAndCount = async (params: GetAllAndCountParams) => {
    const { first, last, before, after } = params;
    const take = (last ? last : first) || 100;
    const order = last ? 'DESC' : 'ASC';

    const query = this.manager
      .getRepository(Team)
      .createQueryBuilder('team')
      .orderBy('team.id', order)
      .take(Math.min(take, 100));

    if (before) {
      const { id } = Cursor.decode(before);
      query.orWhere('team.id < :id', { id });
    }

    if (after) {
      const { id } = Cursor.decode(after);
      query.orWhere('team.id > :id', { id });
    }

    return await query.getManyAndCount();
  };

  createFromDataset = async (teamDataset: TeamDataset) => {
    const team = new Team();
    team.id = teamDataset.id;
    team.name = teamDataset.name;
    team.members = await this.manager
      .getCustomRepository(PerformerRepository)
      .find.loadMany(teamDataset.performerIds);

    return this.manager.save(team);
  };
}
