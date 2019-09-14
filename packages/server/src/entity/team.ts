import { PrimaryColumn, Column, ManyToMany, Entity } from 'typeorm';
import * as G from 'src/generated/graphql';
import { Performer } from './performer';

@Entity()
export class Team {
  toResponse = (): G.Team => {
    return {
      id: this.id,
      name: this.name,
      members: (this.members || []).map(member => member.toResponse()),
    };
  };

  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @ManyToMany(() => Performer, performer => performer.teams, {
    onDelete: 'CASCADE',
  })
  members: Performer[];
}
