import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Team } from './team';
import { TwitterAccount } from './twitter-account';
import { YoutubeAccount } from './youtube-account';

@Entity()
export class Performer {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  latinName: string;

  @Column('text')
  ruby: string;

  @Column('text')
  avatar: string;

  @Column('text')
  color: string;

  @Column('text')
  description: string;

  @Column('int')
  public: number;

  @Column('int')
  position: number;

  @OneToMany(() => TwitterAccount, account => account.performer)
  twitterAccounts: TwitterAccount[];

  @OneToMany(() => YoutubeAccount, account => account.performer)
  youtubeAccounts: YoutubeAccount[];

  @ManyToMany(() => Team, team => team.members, { onDelete: 'CASCADE' })
  @JoinTable()
  teams: Team[];
}
