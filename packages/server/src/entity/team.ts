import { PrimaryColumn, Column, ManyToMany, Entity } from 'typeorm';
import { Performer } from './performer';

@Entity()
export class Team {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @ManyToMany(() => Performer, performer => performer.teams)
  members: Performer[];
}
