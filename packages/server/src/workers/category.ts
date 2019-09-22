import { Gateway, Genre } from '@ril/gateway';
import { CronJob } from 'cron';
import { RESOURCE_URL } from 'src/config';
import { Connection } from 'typeorm';
import { CategoryRepostiory } from 'src/repository/category';

export class CategoryCron {
  private readonly db: Connection;
  private readonly gateway: Gateway;

  constructor(db: Connection) {
    this.db = db;
    this.gateway = new Gateway(RESOURCE_URL);
    this.cron();
  }

  private cron = () => {
    const job = new CronJob('* * * * *', this.collectCategories);
    return job.start();
  };

  private collectCategories = async () => {
    const genres = await this.gateway
      .fetchGenres()
      .then(response => response.data.genres);

    for (const genre of genres) {
      this.createCategory(genre);
    }
  };

  private createCategory = async (genre: Genre) => {
    return this.db
      .getCustomRepository(CategoryRepostiory)
      .createFromGatewayData(genre);
  };
}
