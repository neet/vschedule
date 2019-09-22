import { Entity, Column } from 'typeorm';
import { SocialAccount } from './social-account';

@Entity()
export class TwitterAccount extends SocialAccount {
  @Column('text')
  screenName: string;
}
