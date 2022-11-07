export interface PerformerSeed {
  readonly name: string;
  readonly color: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly url?: string;
  readonly twitterUsername?: string;
  readonly youtubeChannelId?: string;
}

export interface OrganizationSeed {
  readonly name: string;
  readonly color: string;
  readonly description?: string;
  readonly url?: string;
  readonly twitterUsername?: string;
  readonly youtubeChannelId?: string;
}
