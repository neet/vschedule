// import { Connection } from 'typeorm';
// import { Gateway } from '@ril/gateway';
// import { RESOURCE_URL } from 'src/config';
// import { CronJob } from 'cron';

// export class ContentsCron {
//   private readonly db: Connection;
//   private readonly gateway: Gateway;

//   constructor(db: Connection) {
//     this.db = db;
//     this.gateway = new Gateway(RESOURCE_URL);
//     this.cron();
//   }

//   private cron = () => {
//     new CronJob('* * * * *', async () => {
//       const events = await this.gateway.fetchEvents();

//       for (const event of events) {

//       }
//     })
//   }
// }
