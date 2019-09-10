import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { LiverRelationships } from '@ril/gateway';
import * as G from '../generated/graphql';
import { Team } from './team';
import { TwitterAccount, YoutubeAccount } from './social-account';

@Entity()
export class Performer {
  static fromGatewayData(data: LiverRelationships) {
    const performer = new Performer();

    performer.id = data.liver.id.toString();
    performer.name = data.liver.name;
    performer.latinName = data.liver.english_name || '';
    performer.ruby = data.liver.furigana || '';
    performer.avatar = data.liver.avatar;
    performer.color = data.liver.color;
    performer.description = data.liver.description || '';
    performer.public = data.liver.public || 0;
    performer.position = data.liver.position || 1;

    performer.twitterAccounts = [
      TwitterAccount.fromGatewayData(data.liver_twitter_account),
    ];

    if (!Array.isArray(data.liver_youtube_channel)) {
      data.liver_youtube_channel = [data.liver_youtube_channel];
    }

    performer.youtubeAccounts = data.liver_youtube_channel.flatMap(youtube => {
      return YoutubeAccount.fromGatewayData(youtube);
    });

    return performer;
  }

  toResponse(): G.Performer {
    return {
      id: this.id,
      name: this.name,
      latinName: this.latinName,
      ruby: this.ruby,
      avatar: this.avatar,
      color: this.color,
      description: this.description,
      public: this.public,
      position: this.position,
      teams: [],
      socialAccounts: [this.youtubeAccounts, this.twitterAccounts].flat(),
    };
  }

  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  latinName: string;

  @Column('text')
  ruby: string;

  @Column('text')
  avatar: string;

  @Column('text')
  color: string;

  @Column('text')
  description: string;

  @Column('int')
  public: number;

  @Column('int')
  position: number;

  @OneToMany(() => TwitterAccount, account => account.perfomer)
  twitterAccounts: TwitterAccount[];

  @OneToMany(() => YoutubeAccount, account => account.perfomer)
  youtubeAccounts: YoutubeAccount[];

  @ManyToMany(() => Team, team => team.members, { onDelete: 'CASCADE' })
  @JoinTable()
  teams: Team[];
}
