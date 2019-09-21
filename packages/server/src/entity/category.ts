import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;
}
