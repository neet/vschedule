import { PrimaryColumn, ManyToOne } from 'typeorm';
import { Performer } from './performer';

export abstract class SocialAccount {
  @PrimaryColumn('text')
  id: string;

  @ManyToOne(() => Performer, { onDelete: 'CASCADE' })
  performer: Performer;
}
