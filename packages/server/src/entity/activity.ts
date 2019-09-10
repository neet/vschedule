import { Event } from '@ril/gateway';
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
  static fromGatewayData(data: Event) {
    const activity = new Activity();

    activity.id = data.id.toString();
    activity.name = data.name;
    activity.description = data.description;
    activity.public = data.public;
    activity.url = data.url;
    activity.thumbnail = data.thumbnail;
    activity.startAt = data.start_date;
    activity.endAt = data.end_date;
    activity.category = data.genre
      ? Category.fromGatewayData(data.genre)
      : undefined;

    return activity;
  }

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      public: this.public,
      url: this.url,
      thumbnail: this.thumbnail,
      startAt: this.startAt,
      endAt: this.endAt,
      recommend: false,
      performers: this.performers.map(performer => performer.toResponse()),
      category: this.category ? this.category.toResponse() : undefined,
      team: undefined,
    };
  }

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
