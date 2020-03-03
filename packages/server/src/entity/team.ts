import {
  PrimaryColumn,
  Column,
  ManyToMany,
  OneToMany,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Performer } from './performer';
import { Activity } from './activity';

@Entity()
export class Team {
  @PrimaryColumn('text')
  id: string;

  @Index()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  readonly updatedAt: Date;

  @Column('text')
  name: string;

  @ManyToMany(
    () => Performer,
    performer => performer.teams,
    {
      onDelete: 'CASCADE',
    },
  )
  members: Performer[];

  @OneToMany(
    () => Activity,
    activity => activity.team,
  )
  activities: Activity[];
}
