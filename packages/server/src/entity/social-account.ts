import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Streamer } from './streamer';

export abstract class SocialAccount {
  @PrimaryColumn('text')
  id: string;

  @ManyToOne(() => Streamer, streamer => streamer.socialAccounts)
  @JoinColumn()
  streamer: Streamer;
}

@Entity()
export class TwitterAccount extends SocialAccount {
  @Column('text')
  screenName: string;
}

@Entity()
export class YoutubeChannel extends SocialAccount {
  @Column('text')
  channel: string;

  @Column('text')
  channelName: string;

  @Column('int')
  creationOrder: number;
}
