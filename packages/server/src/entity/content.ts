import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { Category } from './category';

@Entity()
export class Content {
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

  @OneToOne(() => Category)
  category: Category;
}
