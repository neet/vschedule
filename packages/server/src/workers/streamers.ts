import { Gateway, LiverRelationships } from '@ril/gateway';
import { CronJob } from 'cron';
import { RESOURCE_URL } from 'src/config';
import { Connection } from 'typeorm';
import { Streamer } from 'src/entity/streamer';
import { SocialAccount } from 'src/entity/social-account';
import { TwitterAccount } from 'src/entity/twitter-account';
import { LiverYoutubeChannel } from 'src/datasources/itsukara-link';
import { YoutubeChannel } from 'src/entity/youtube-channel';

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
        const streamer = await this.db.manager.findOne(
          Streamer,
          item.liver.id.toString(),
        );

        if (streamer) {
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

    const streamer = new Streamer();
    streamer.id = liver.id.toString();
    streamer.name = liver.name;
    streamer.latinName = liver.english_name || '';
    streamer.ruby = liver.furigana || '';
    streamer.avatar = liver.avatar;
    streamer.color = liver.color;
    streamer.description = liver.description || '';
    streamer.public = liver.public || 1;
    streamer.position = liver.position || 0;

    const socialAccounts: SocialAccount[] = [];

    const twitterAccount = new TwitterAccount();
    twitterAccount.id = liver_twitter_account.id.toString();
    twitterAccount.screenName = liver_twitter_account.screen_name;
    // twitterAccount.streamer = streamer;
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

    streamer.socialAccounts = socialAccounts;
    streamer.groups = [];

    await this.db.manager.save(streamer);
  }
}
