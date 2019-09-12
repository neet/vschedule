import { Gateway, Event } from '@ril/gateway';
import { CronJob } from 'cron';
import { RESOURCE_URL } from 'src/config';
import { Connection } from 'typeorm';
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
      this.createActivity(event);
    }
  };

  private createActivity = async (event: Event) => {
    const activity = Activity.fromGatewayData(event);
    await this.db.manager.save(activity);
  };
}
