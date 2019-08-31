import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Streamer } from './streamer';

@Entity()
export abstract class SocialAccount {
  @PrimaryColumn('text')
  id: string;

  @ManyToOne(() => Streamer, streamer => streamer.socialAccounts)
  @JoinColumn()
  streamer: Streamer;
}
