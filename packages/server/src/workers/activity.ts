import { Gateway, Event, LiverRelationships } from '@ril/gateway';
import { CronJob } from 'cron';
import { RESOURCE_URL } from 'src/config';
import { Connection } from 'typeorm';
import { ActivityRepository } from 'src/repository/activity';
import { Performer } from 'src/entity/performer';

export class ActivityCron {
  private readonly db: Connection;
  private readonly gateway: Gateway;

  constructor(db: Connection) {
    this.db = db;
    this.gateway = new Gateway(RESOURCE_URL);
    this.cron();
  }

  private cron = () => {
    const job = new CronJob('* * * * *', this.collectActivities);
    return job.start();
  };

  private collectActivities = async () => {
    const events = await this.gateway
      .fetchEvents()
      .then(response => response.data.events);

    for (const event of events) {
      const liverRelationships: LiverRelationships[] = [];

      for (const liver of event.livers) {
        // prettier-ignore
        const performer = this.db.manager.findOne(Performer, liver.id.toString());

        if (performer) {
          continue;
        }

        liverRelationships.push(
          await this.gateway
            .fetchLiver(liver.id)
            .then(response => response.data),
        );
      }

      this.createActivity(event, liverRelationships);
    }
  };

  private createActivity = async (
    event: Event,
    liverRelationships: LiverRelationships[],
  ) => {
    return this.db
      .getCustomRepository(ActivityRepository)
      .createFromGatewayData(event, liverRelationships);
  };
}
