import DataLoader from 'dataloader';
import { Cursor } from 'src/utils/cursor';
import { EntityRepository, EntityManager } from 'typeorm';
import { Performer } from 'src/entity/performer';
import { LiverRelationship } from '@ril/gateway';
import { TwitterAccount } from 'src/entity/twitter-account';
import { YoutubeAccount } from 'src/entity/youtube-account';

interface GetAllAndCountParams {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}

@EntityRepository(Performer)
export class PerformerRepository {
  constructor(private readonly manager: EntityManager) {}

  find = new DataLoader<string, Performer>(ids => {
    return this.manager
      .getRepository(Performer)
      .createQueryBuilder('performer')
      .whereInIds(ids)
      .getMany();
  });

  findByTeamId = async (teamId: string) => {
    return this.manager
      .getRepository(Performer)
      .createQueryBuilder('performer')
      .leftJoin('performer.teams', 'team')
      .where('team.id = :id', { id: teamId })
      .getMany();
  };

  getAllAndCount = async (params: GetAllAndCountParams) => {
    const { first, last, before, after } = params;
    const take = (last ? last : first) || 100;
    const order = last ? 'DESC' : 'ASC';

    const query = this.manager
      .getRepository(Performer)
      .createQueryBuilder('performer')
      .orderBy('performer.id', order)
      .take(Math.min(take, 100));

    if (before) {
      const { id } = Cursor.decode(before);
      query.orWhere('performer.id < :id', { id });
    }

    if (after) {
      const { id } = Cursor.decode(after);
      query.orWhere('performer.id > :id', { id });
    }

    return await query.getManyAndCount();
  };

  createFromGatewayData = (data: LiverRelationship) => {
    const performer = new Performer();

    performer.id = data.liver.id.toString();
    performer.name = data.liver.name;
    performer.avatar = data.liver.avatar;
    performer.color = data.liver.color;
    performer.latinName = data.liver.english_name || '';
    performer.ruby = data.liver.furigana || '';
    performer.fullBody = data.liver.fullbody || '';
    performer.description = data.liver.description || '';
    performer.public = data.liver.public || 0;
    performer.position = data.liver.position || 1;
    performer.twitterAccounts = [];
    performer.youtubeAccounts = [];
    // performer.teams = [];

    // Twitter
    const twitterAccount = new TwitterAccount();
    twitterAccount.id = data.liver_twitter_account.id.toString();
    twitterAccount.screenName = data.liver_twitter_account.screen_name;
    performer.twitterAccounts.push(twitterAccount);
    this.manager.save(twitterAccount);

    // YouTube
    if (!Array.isArray(data.liver_youtube_channel)) {
      data.liver_youtube_channel = [data.liver_youtube_channel];
    }

    for (const youtube of data.liver_youtube_channel) {
      const youtubeAccount = new YoutubeAccount();
      youtubeAccount.id = youtube.id.toString();
      youtubeAccount.channelId = youtube.channel;
      youtubeAccount.channelName = youtube.channel_name;
      youtubeAccount.creationOrder = youtube.creation_order;
      performer.youtubeAccounts.push(youtubeAccount);
      this.manager.save(youtubeAccount);
    }

    return this.manager.save(performer);
  };
}
