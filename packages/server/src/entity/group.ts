import { PrimaryColumn, Column, ManyToMany, Entity } from 'typeorm';
import { Streamer } from './streamer';

@Entity()
export class Group {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @ManyToMany(() => Streamer, streamer => streamer.groups)
  members: Streamer[];
}
