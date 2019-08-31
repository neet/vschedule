import { Entity, Column } from 'typeorm';
import { SocialAccount } from './social-account';

@Entity()
export class YoutubeChannel extends SocialAccount {
  @Column('text')
  channel: string;

  @Column('text')
  channelName: string;

  @Column('int')
  creationOrder: number;
}
