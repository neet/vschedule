import { Entity, PrimaryColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Group } from './group';
import { SocialAccount } from './social-account';

@Entity()
export class Streamer {
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

  @OneToMany(() => SocialAccount, socialAccount => socialAccount.streamer)
  socialAccounts: SocialAccount[];

  @ManyToMany(() => Group, group => group.members)
  groups: Group[];
}
