import { Entity, PrimaryColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Team } from './team';
import { SocialAccount } from './social-account';

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

  @OneToMany(() => SocialAccount, socialAccount => socialAccount.performer)
  socialAccounts: SocialAccount[];

  @ManyToMany(() => Team, team => team.members)
  teams: Team[];
}
