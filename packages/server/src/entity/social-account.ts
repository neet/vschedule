import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { LiverTwitterAccount, LiverYoutubeChannel } from '@ril/gateway';
import * as G from '../generated/graphql';
import { Performer } from './performer';

export abstract class SocialAccount {
  @PrimaryColumn('text')
  id: string;

  @ManyToOne(() => Performer, { onDelete: 'CASCADE' })
  perfomer: Performer;
}

@Entity()
export class TwitterAccount extends SocialAccount {
  static fromGatewayData(data: LiverTwitterAccount) {
    const twitterAccount = new TwitterAccount();
    twitterAccount.id = data.id.toString();
    twitterAccount.screenName = data.screen_name;
    return twitterAccount;
  }

  toResponse(): G.TwitterAccount {
    return {
      id: this.id,
      screenName: this.screenName,
    };
  }

  @Column('text')
  screenName: string;
}

@Entity()
export class YoutubeAccount extends SocialAccount {
  static fromGatewayData(data: LiverYoutubeChannel) {
    const youtubeAccount = new YoutubeAccount();
    youtubeAccount.id = data.id.toString();
    youtubeAccount.channelId = data.channel;
    youtubeAccount.channelName = data.channel_name;
    youtubeAccount.creationOrder = data.creation_order;
    return youtubeAccount;
  }

  toResponse(): G.YoutubeAccount {
    return {
      id: this.id,
      channel: this.channelId,
      channelName: this.channelName,
      creationOrder: this.creationOrder,
    };
  }

  @Column('text')
  channelId: string;

  @Column('text')
  channelName: string;

  @Column('int')
  creationOrder: number;
}
