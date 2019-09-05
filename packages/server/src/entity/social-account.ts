import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
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
