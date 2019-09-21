import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './category';
import { Performer } from './performer';

@Entity()
export class Activity {
  @PrimaryColumn('text')
  id: string;

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

  @Column('text')
  startAt: string;

  @Column('text')
  endAt: string;

  @ManyToMany(() => Performer, { onDelete: 'CASCADE' })
  @JoinTable()
  performers: Performer[];

  @ManyToOne(() => Category, { onDelete: 'SET NULL' })
  @JoinColumn()
  category?: Category;
}
