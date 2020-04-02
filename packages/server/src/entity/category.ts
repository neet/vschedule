import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Activity } from './activity';

@Entity()
export class Category {
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

  @OneToMany(() => Activity, (activity) => activity.category, {
    onDelete: 'SET NULL',
  })
  activities: Activity[];
}
