import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { LiverTwitterAccount, LiverYoutubeChannel } from '@ril/gateway';
import * as G from '../generated/graphql';
import { Performer } from './performer';

export abstract class SocialAccount {
  @PrimaryColumn('text')
  id: string;

  @ManyToOne(() => Performer, performer => performer.socialAccounts)
  @JoinColumn()
  performer: Performer;
}

@Entity()
export class TwitterAccount extends SocialAccount {
  static fromGatewayData(data: LiverTwitterAccount) {
    const twitterAccount = new TwitterAccount();
    twitterAccount.id = data.id.toString();
    // twitterAccount.performer = Performer.fromGatewayData();
    return twitterAccount;
  }

  toResponse(): G.TwitterAccount {
    return {
      id: this.id,
      performerId: this.performer.id,
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
    youtubeAccount.channelId = data.channel;
    youtubeAccount.channelId = data.channel;
    return youtubeAccount;
  }

  toResponse(): G.YoutubeAccount {
    return {
      id: this.id,
      performerId: this.performer.id,
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
