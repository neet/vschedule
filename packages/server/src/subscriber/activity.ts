import {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
} from 'typeorm';
import { Activity } from '../entity/activity';
import { createElasticsearchConnection } from '../elasticsearch';

@EventSubscriber()
export class ActivitySubscriber implements EntitySubscriberInterface<Activity> {
  listenTo = () => Activity;

  afterInsert = async (event: InsertEvent<Activity>) => {
    await this.updateElasticsearch(event.entity);
  };

  afterUpdate = async (event: UpdateEvent<Activity>) => {
    await this.updateElasticsearch(event.entity);
  };

  updateElasticsearch = async (activity: Activity) => {
    const es = await createElasticsearchConnection();

    return es.update({
      index: 'activity',
      type: '_doc',
      id: activity.id,
      body: {
        doc: {
          name: activity.name,
          description: activity.description,
        },
        doc_as_upsert: true,
      },
    });
  };
}
