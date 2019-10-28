import {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
} from 'typeorm';
import { Team } from 'src/entity/team';
import { createElasticsearchConnection, indices } from '../elasticsearch';

@EventSubscriber()
export class TeamSubscriber implements EntitySubscriberInterface<Team> {
  listenTo = () => Team;

  afterInsert = async (event: InsertEvent<Team>) => {
    await this.updateElasticsearch(event.entity);
  };

  afterUpdate = async (event: UpdateEvent<Team>) => {
    await this.updateElasticsearch(event.entity);
  };

  updateElasticsearch = async (team: Team) => {
    const es = await createElasticsearchConnection();

    return es.update({
      index: indices.team,
      type: '_doc',
      id: team.id,
      body: {
        doc: {
          name: team.name,
        },
        doc_as_upsert: true,
      },
    });
  };
}
