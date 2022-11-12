import { Dayjs } from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';
import { URL } from 'url';

import { MediaAttachment } from '../../media-attachments/domain';
import { PerformerDto } from '../../performers/app/performer-dto';
import { StreamDescription, StreamId, StreamTitle } from '../domain';

export interface StreamDto {
  readonly id: StreamId;
  readonly title: StreamTitle;
  readonly description: StreamDescription | null;
  readonly url: URL;
  readonly thumbnail: MediaAttachment | null;

  readonly owner: PerformerDto;
  readonly casts: readonly PerformerDto[];

  readonly startedAt: Dayjs;
  readonly endedAt: Dayjs | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
  readonly duration: Duration | null;
}
