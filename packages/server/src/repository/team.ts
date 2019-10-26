import DataLoader from 'dataloader';
import { EntityManager, EntityRepository } from 'typeorm';
import { Team } from 'src/entity/team';
import { TeamDataset } from 'src/utils/teams';
import { PerformerRepository } from './performer';

interface GetAllAndCountParams {
  limit?: number;
  offset?: number;
  order?: 'ASC' | 'DESC';
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

  getAllAndCount = async (params: GetAllAndCountParams = {}) => {
    const { limit = 100, offset = 0, order = 'ASC' } = params;

    const query = this.manager
      .getRepository(Team)
      .createQueryBuilder('team')
      .orderBy('team.id', order)
      .skip(offset)
      .take(Math.min(limit, 100));

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
