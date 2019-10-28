import {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
} from 'typeorm';
import { Performer } from 'src/entity/performer';
import { createElasticsearchConnection, indices } from '../elasticsearch';

@EventSubscriber()
export class PerformerSubscriber
  implements EntitySubscriberInterface<Performer> {
  listenTo = () => Performer;

  afterInsert = async (event: InsertEvent<Performer>) => {
    await this.updateElasticsearch(event.entity);
  };

  afterUpdate = async (event: UpdateEvent<Performer>) => {
    await this.updateElasticsearch(event.entity);
  };

  updateElasticsearch = async (performer: Performer) => {
    const es = await createElasticsearchConnection();

    return es.update({
      index: indices.performers,
      type: '_doc',
      id: performer.id,
      body: {
        doc: {
          name: performer.name,
          description: performer.description,
        },
        doc_as_upsert: true,
      },
    });
  };
}
