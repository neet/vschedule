import {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
} from 'typeorm';
import { Category } from 'src/entity/category';
import { createElasticsearchConnection } from '../elasticsearch';

@EventSubscriber()
export class CategroySubscriber implements EntitySubscriberInterface<Category> {
  listenTo = () => Category;

  afterInsert = async (event: InsertEvent<Category>) => {
    await this.updateElasticsearch(event.entity);
  };

  afterUpdate = async (event: UpdateEvent<Category>) => {
    await this.updateElasticsearch(event.entity);
  };

  updateElasticsearch = async (category: Category) => {
    const es = await createElasticsearchConnection();

    return es.update({
      index: 'category',
      type: '_doc',
      id: category.id,
      body: {
        doc: {
          name: category.name,
        },
        doc_as_upsert: true,
      },
    });
  };
}
