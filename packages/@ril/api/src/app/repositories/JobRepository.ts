export interface RefreshJob {
  readonly type: 'refresh';
  readonly actorId: string;
  readonly scheduledAt: Date;
}

export interface JobRepository {
  queue(job: RefreshJob): Promise<void>;
}
