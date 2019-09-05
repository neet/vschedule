import { Gateway, LiverRelationships } from '@ril/gateway';
import { CronJob } from 'cron';
import { RESOURCE_URL } from 'src/config';
import { Connection } from 'typeorm';
import { Performer } from 'src/entity/performer';
import {
  SocialAccount,
  TwitterAccount,
  YoutubeChannel,
} from 'src/entity/social-account';
import { LiverYoutubeChannel } from 'src/datasources/itsukara-link';

export class StreamerCron {
  private readonly db: Connection;
  private readonly gateway: Gateway;

  constructor(db: Connection) {
    this.db = db;
    this.gateway = new Gateway(RESOURCE_URL);
    this.cron();
  }

  private cron = () => {
    const job = new CronJob('* * * * *', async () => {
      const livers = await this.gateway.fetchLivers();

      for (const item of livers.data.liver_relationships) {
        const performer = await this.db.manager.findOne(
          Performer,
          item.liver.id.toString(),
        );

        if (performer) {
          continue;
        }

        const liverRelationship = await this.gateway.fetchLiver(item.liver.id);
        await this.createStreamer(liverRelationship.data);
      }
    });

    return job.start();
  };

  private reduceYoutubeAccount = (liverYoutubeChannel: LiverYoutubeChannel) => {
    const youtubeChannel = new YoutubeChannel();
    youtubeChannel.id = liverYoutubeChannel.id.toString();
    youtubeChannel.channel = liverYoutubeChannel.channel;
    youtubeChannel.channelName = liverYoutubeChannel.channel_name;
    youtubeChannel.creationOrder = liverYoutubeChannel.creation_order;

    return youtubeChannel;
  };

  private async createStreamer(liverRelationships: LiverRelationships) {
    const {
      liver,
      liver_twitter_account,
      liver_youtube_channel,
    } = liverRelationships;

    const performer = new Performer();
    performer.id = liver.id.toString();
    performer.name = liver.name;
    performer.latinName = liver.english_name || '';
    performer.ruby = liver.furigana || '';
    performer.avatar = liver.avatar;
    performer.color = liver.color;
    performer.description = liver.description || '';
    performer.public = liver.public || 1;
    performer.position = liver.position || 0;

    const socialAccounts: SocialAccount[] = [];

    const twitterAccount = new TwitterAccount();
    twitterAccount.id = liver_twitter_account.id.toString();
    twitterAccount.screenName = liver_twitter_account.screen_name;
    // twitterAccount.performer = performer;
    await this.db.manager.save(twitterAccount);
    socialAccounts.push(twitterAccount);

    if (Array.isArray(liver_youtube_channel)) {
      for (const item of liver_youtube_channel) {
        const youtubeChannel = this.reduceYoutubeAccount(item);
        await this.db.manager.save(youtubeChannel);
        socialAccounts.push(youtubeChannel);
      }
    } else {
      const youtubeChannel = this.reduceYoutubeAccount(liver_youtube_channel);
      await this.db.manager.save(youtubeChannel);
      socialAccounts.push(youtubeChannel);
    }

    performer.socialAccounts = socialAccounts;
    performer.teams = [];

    await this.db.manager.save(performer);
  }
}
