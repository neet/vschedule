import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team';
import { TwitterAccount } from './twitter-account';
import { YoutubeAccount } from './youtube-account';

@Entity()
export class Performer {
  @PrimaryColumn('text')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  readonly updatedAt: Date;

  @Column('text')
  name: string;

  @Column('text')
  latinName: string;

  @Column('text')
  ruby: string;

  @Column('text')
  avatar: string;

  @Column('text')
  fullBody: string;

  @Column('text')
  color: string;

  @Column('text')
  description: string;

  @Column('int')
  public: number;

  @Column('int')
  position: number;

  @OneToMany(() => TwitterAccount, account => account.performer, {
    onDelete: 'SET NULL',
  })
  twitterAccounts: TwitterAccount[];

  @OneToMany(() => YoutubeAccount, account => account.performer, {
    onDelete: 'SET NULL',
  })
  youtubeAccounts: YoutubeAccount[];

  @ManyToMany(() => Team, team => team.members, { onDelete: 'SET NULL' })
  @JoinTable()
  teams: Team[];
}
