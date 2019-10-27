import {
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Performer } from './performer';

export abstract class SocialAccount {
  @PrimaryColumn('text')
  id: string;

  @Index()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  readonly updatedAt: Date;

  @ManyToOne(() => Performer, { onDelete: 'CASCADE' })
  performer: Performer;
}
