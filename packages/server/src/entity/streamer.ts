import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Group } from './group';

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

  @Column('text')
  socialAccounts: unknown[];

  @ManyToMany(() => Group, group => group.members)
  groups: Group[];
}
