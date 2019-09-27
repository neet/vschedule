import {
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Performer } from './performer';

export abstract class SocialAccount {
  @PrimaryColumn('text')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  readonly updatedAt: Date;

  @ManyToOne(() => Performer, { onDelete: 'CASCADE' })
  performer: Performer;
}
