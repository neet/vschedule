import DataLoader from 'dataloader';
import { Connection, Repository } from 'typeorm';
import { Activity } from './entity/activity';
import { Category } from './entity/category';
import { Performer } from './entity/performer';
import { Team } from './entity/team';

export class Loader {
  activityRepo: Repository<Activity>;
  categoryRepo: Repository<Category>;
  performerRepo: Repository<Performer>;
  teamRepo: Repository<Team>;

  constructor(connection: Connection) {
    const manager = connection.manager;
    this.activityRepo = manager.getRepository(Activity);
    this.categoryRepo = manager.getRepository(Category);
    this.performerRepo = manager.getRepository(Performer);
    this.teamRepo = manager.getRepository(Team);
  }

  activityLoader = new DataLoader<string, Activity>(ids =>
    this.activityRepo
      .createQueryBuilder('activity')
      .where('activity.id IN (:...ids)', { ids })
      .getMany(),
  );

  categoryLoader = new DataLoader<string, Category>(ids =>
    this.categoryRepo
      .createQueryBuilder('category')
      .where('category.id IN (:...ids)', { ids })
      .getMany(),
  );

  performerLoader = new DataLoader<string, Performer>(ids =>
    this.performerRepo
      .createQueryBuilder('performer')
      .where('performer.id IN (:...ids)', { ids })
      .getMany(),
  );

  teamLoader = new DataLoader<string, Team>(ids =>
    this.teamRepo
      .createQueryBuilder('team')
      .where('team.id IN (:...ids)', { ids })
      .getMany(),
  );
}