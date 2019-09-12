import { Gateway, LiverRelationships } from '@ril/gateway';
import { CronJob } from 'cron';
import { RESOURCE_URL } from 'src/config';
import { Connection } from 'typeorm';
import { Performer } from 'src/entity/performer';

export class StreamerCron {
  private readonly db: Connection;
  private readonly gateway: Gateway;

  constructor(db: Connection) {
    this.db = db;
    this.gateway = new Gateway(RESOURCE_URL);
    this.cron();
  }

  private cron = () => {
    const job = new CronJob('* * * * *', this.collectStreamers);
    return job.start();
  };

  private collectStreamers = async () => {
    const livers = await this.gateway.fetchLivers();

    for (const item of livers.data.liver_relationships) {
      const performer = await this.db.manager.findOne(
        Performer,
        item.liver.id.toString(),
      );

      // Skip if existing...
      if (performer) {
        continue;
      }

      const liverRelationship = await this.gateway.fetchLiver(item.liver.id);
      await this.createStreamer(liverRelationship.data);
    }
  };

  private createStreamer = async (liverRelationships: LiverRelationships) => {
    const performer = Performer.fromGatewayData(liverRelationships);
    await this.db.manager.save(performer.twitterAccounts);
    await this.db.manager.save(performer.youtubeAccounts);
    await this.db.manager.save(performer);
  };
}
