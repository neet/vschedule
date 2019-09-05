import { Event } from '@ril/gateway';
import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
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

  @Column()
  performers: Performer[];

  @OneToOne(() => Category)
  category?: Category;
}
