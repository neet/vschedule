import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Category } from './category';
import { Performer } from './performer';
import { Team } from './team';

@Entity()
export class Activity {
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

  @Column('text')
  description: string;

  @Column('int')
  public: number;

  @Column('text')
  url: string;

  @Column('text')
  thumbnail: string;

  @Index()
  @Column('timestamp with time zone')
  startAt: Date;

  @Index()
  @Column('timestamp with time zone')
  endAt: Date;

  @ManyToMany(() => Performer, { onDelete: 'CASCADE' })
  @JoinTable()
  performers: Performer[];

  @ManyToOne(() => Category, { onDelete: 'SET NULL' })
  @JoinColumn()
  category?: Category;

  @ManyToOne(() => Team, { onDelete: 'SET NULL' })
  @JoinColumn()
  team?: Team;
}
