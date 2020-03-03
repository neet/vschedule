import { Gateway, Event, LiverRelationship } from '@ril/gateway';
import { CronJob } from 'cron';
import { RESOURCE_URL } from 'src/config';
import { Connection } from 'typeorm';
import { ActivityRepository } from 'src/repository/activity';
import { Activity } from 'src/entity/activity';

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
      const activity = await this.db.manager.findOne(
        Activity,
        event.id.toString(),
      );

      if (activity) {
        continue;
      }

      // TODO: Optimize this
      const liverRelationships = (
        await Promise.all(
          event.livers.map(async liver => {
            return await this.gateway.fetchLiver(liver.id);
          }),
        )
      ).map(response => response.data);

      this.createActivity(event, liverRelationships);
    }
  };

  private createActivity = async (
    event: Event,
    liverRelationships: LiverRelationship[],
  ) => {
    return this.db
      .getCustomRepository(ActivityRepository)
      .createFromGatewayData(event, liverRelationships);
  };
}
