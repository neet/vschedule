import {
  PrimaryColumn,
  Column,
  ManyToMany,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Performer } from './performer';

@Entity()
export class Team {
  @PrimaryColumn('text')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  readonly updatedAt: Date;

  @Column('text')
  name: string;

  @ManyToMany(() => Performer, performer => performer.teams, {
    onDelete: 'CASCADE',
  })
  members: Performer[];
}
