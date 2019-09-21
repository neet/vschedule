import { Entity, Column } from 'typeorm';
import { SocialAccount } from './social-account';

@Entity()
export class YoutubeAccount extends SocialAccount {
  @Column('text')
  channelId: string;

  @Column('text')
  channelName: string;

  @Column('int')
  creationOrder: number;
}
