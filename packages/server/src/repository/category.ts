import DataLoader from 'dataloader';
import { Cursor } from 'src/utils/cursor';
import { EntityRepository, EntityManager } from 'typeorm';
import { Category } from 'src/entity/category';
import { Genre } from '@ril/gateway';

interface GetAllAndCountParams {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}

@EntityRepository(Category)
export class CategoryRepostiory {
  constructor(private readonly manager: EntityManager) {}

  find = new DataLoader<string, Category>(ids => {
    return this.manager
      .getRepository(Category)
      .createQueryBuilder('category')
      .whereInIds(ids)
      .getMany();
  });

  getAllAndCount = async (params: GetAllAndCountParams) => {
    const { first, last, before, after } = params;
    const take = (last ? last : first) || 100;
    const order = last ? 'DESC' : 'ASC';

    const query = this.manager
      .getRepository(Category)
      .createQueryBuilder('category')
      .orderBy('category.id', order)
      .take(Math.min(take, 100));

    if (before) {
      const { id } = Cursor.decode(before);
      query.orWhere('category.id < :id', { id });
    }

    if (after) {
      const { id } = Cursor.decode(after);
      query.orWhere('category.id > :id', { id });
    }

    return await query.getManyAndCount();
  };

  createFromGatewayData = (data: Genre) => {
    const category = new Category();
    category.id = data.id.toString();
    category.name = data.name;
    return this.manager.save(category);
  };
}
